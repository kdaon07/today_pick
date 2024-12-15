"use client";

import styled from "styled-components";
import movieData from "../../../../public/movie.json";
import { useParams } from "next/navigation";
import Header from "@/components/header";

const Detail = () => {
    const params = useParams();
    const id = params.id as string;

    const filteredMovie = movieData.find((movie) => movie.Source === parseInt(id));

    if (!filteredMovie) {
        return (
            <>
                <Header />
                <Container>해당 영화 정보를 찾을 수 없습니다.</Container>
            </>
        );
    }

    return (
        <>
            <Header />
            <Container>
                <Card>
                    <CardTitle>{filteredMovie.MOVIE_NM}</CardTitle>
                    <CardDescription>
                        <strong>감독:</strong> {filteredMovie.DRCTR_NM || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>제작사:</strong> {filteredMovie.MAKR_NM || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>개봉일:</strong> {filteredMovie.OPN_DE || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>장르:</strong> {filteredMovie.GENRE_NM || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>등급:</strong> {filteredMovie.GRAD_NM || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>총 스크린 수:</strong> {filteredMovie.TOT_SCRN_CO || "정보 없음"}
                    </CardDescription>
                    <CardDescription>
                        <strong>관객 수:</strong> {filteredMovie.VIEWNG_NMPR_CO || "정보 없음"}
                    </CardDescription>
                </Card>
            </Container>
        </>
    );
};

export default Detail;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 5px 0;
`;
