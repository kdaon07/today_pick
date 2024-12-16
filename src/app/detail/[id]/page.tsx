"use client";

import styled from "styled-components";
import movieData from "../../../../public/movie.json";
import { useParams } from "next/navigation";
import Header from "@/components/header";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

type MovieType = {
    NO: number;
    MOVIE_NM: string;
    DRCTR_NM: string;
    MAKR_NM: string;
    INCME_CMPNY_NM: string | null;
    DISTB_CMPNY_NM: string;
    OPN_DE: number;
    MOVIE_TY_NM: string;
    MOVIE_STLE_NM: string;
    GENRE_NM: string;
    GRAD_NM: string;
    NLTY_NM: string;
    TOT_SCRN_CO: number | null;
    SALES_PRICE: number | null;
    VIEWNG_NMPR_CO: number | null;
    Source: number;
};

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Detail = () => {
    const params = useParams();
    const id = params.id as string;

    const filteredMovie = movieData.find((movie) => movie.Source === parseInt(id)) as MovieType | undefined;
    const [sortOption, setSortOption] = useState<keyof MovieType>("VIEWNG_NMPR_CO");

    if (!filteredMovie) {
        return (
            <>
                <Header />
                <Container>해당 영화 정보를 찾을 수 없습니다.</Container>
            </>
        );
    }
    
    const calculateAverage = (key: keyof MovieType) => {
        const validMovies = movieData.filter(
            (movie) => movie[key] !== null && movie[key] !== undefined
        ) as MovieType[];
        const total = validMovies.reduce((sum, movie) => sum + (movie[key] as number), 0);
        return validMovies.length > 0 ? Math.round(total / validMovies.length) : 0;
    };

    const averageValue = calculateAverage(sortOption);
    const currentValue = filteredMovie[sortOption] as number;

    const graphData = {
        labels: ["평균값", filteredMovie.MOVIE_NM],
        datasets: [
            {
                label: `${sortOption === "VIEWNG_NMPR_CO" ? "관객 수" : sortOption === "SALES_PRICE" ? "매출" : "스크린 수"} 비교`,
                data: [averageValue, currentValue],
                backgroundColor: ["#4CAF50", "#FF5722"],
                borderColor: ["#388E3C", "#E64A19"],
                borderWidth: 1,
            },
        ],
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(event.target.value as keyof MovieType);
    };

    function formatDate(opnDe: number | null): string {
        if (!opnDe) return "정보 없음";
        const opnDeStr = opnDe.toString();
        if (opnDeStr.length !== 8) return "정보 없음";
        const year = opnDeStr.slice(0, 4);
        const month = opnDeStr.slice(4, 6);
        const day = opnDeStr.slice(6, 8);
        return `${year}년 ${month}월 ${day}일`;
    }

    function formatNumber(num: number | null | undefined): string {
        if (num == null) return "정보 없음";
        return new Intl.NumberFormat("ko-KR").format(num);
    }

    return (
        <>
            <Header />
            <Container>
                <ContentWrapper>
                    <Card>
                        <CardTitle>{filteredMovie.MOVIE_NM}</CardTitle>
                        <CardDescription>
                            <strong>감독:</strong> {filteredMovie.DRCTR_NM || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>제작사:</strong> {filteredMovie.MAKR_NM || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>개봉일:</strong> {formatDate(filteredMovie.OPN_DE) || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>장르:</strong> {filteredMovie.GENRE_NM || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>등급:</strong> {filteredMovie.GRAD_NM || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>총 스크린 수:</strong> {formatNumber(filteredMovie.TOT_SCRN_CO) || "정보 없음"}
                        </CardDescription>
                        <CardDescription>
                            <strong>관객 수:</strong> {formatNumber(filteredMovie.VIEWNG_NMPR_CO) || "정보 없음"}
                        </CardDescription>
                    </Card>

                    <GraphWrapper>
                        <SortContainer>
                            <label htmlFor="sort">그래프 기준:</label>
                            <Select id="sort" onChange={handleSortChange} value={sortOption}>
                                <option value="VIEWNG_NMPR_CO">관객 수</option>
                                <option value="SALES_PRICE">매출</option>
                                <option value="TOT_SCRN_CO">스크린 수</option>
                            </Select>
                        </SortContainer>

                        <GraphContainer>
                            <Bar data={graphData} />
                        </GraphContainer>
                    </GraphWrapper>
                </ContentWrapper>
            </Container>
        </>
    );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 30px;
  width: 45%;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }
`;

const CardTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #666;
  margin: 10px 0;
`;

const GraphWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SortContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const GraphContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
`;
