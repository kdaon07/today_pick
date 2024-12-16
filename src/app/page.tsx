"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/header";

type Movie = {
  NO: number;
  MOVIE_NM: string;
  DRCTR_NM: string | null;
  MAKR_NM: string | null;
  INCME_CMPNY_NM: string | null;
  DISTB_CMPNY_NM: string;
  OPN_DE: number;
  MOVIE_TY_NM: string;
  MOVIE_STLE_NM: string;
  NLTY_NM: string;
  TOT_SCRN_CO: number | null;
  SALES_PRICE: number | null;
  VIEWNG_NMPR_CO: number | null;
  SEOUL_SALES_PRICE: number | null;
  SEOUL_VIEWNG_NMPR_CO: number | null;
  GENRE_NM: string;
  GRAD_NM: string;
  MOVIE_SDIV_NM: string;
  Source: number;
};

type SortOption = "VIEWNG_NMPR_CO" | "SALES_PRICE" | "TOT_SCRN_CO" | "SEOUL_SALES_PRICE" | "SEOUL_VIEWNG_NMPR_CO";

const Rank = () => {
  const router = useRouter();
  const [sortOption, setSortOption] = useState<SortOption>("VIEWNG_NMPR_CO");
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    import("../../public/movie.json").then((data) => {
      const updatedMovies = data.default.map((movie: any) => ({
        ...movie,
        DRCTR_NM: movie.DRCTR_NM || "",
        MAKR_NM: movie.MAKR_NM || "",
      }));
      setMovies(updatedMovies);
    });
  }, []);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  const handleCardClick = (source: number) => {
    router.push(`/detail/${source}`);
  };

  const sortedMovies = [...movies]
    .filter((movie) => movie.GRAD_NM !== "청소년관람불가" && movie.MOVIE_NM !== null)
    .sort((a, b) => (b[sortOption] || 0) - (a[sortOption] || 0))
    .slice(0, 10);

  return (
    <>
      <Header />
      <Container>
        <SelectContainer>
          <Select onChange={handleSortChange} value={sortOption}>
            <option value="VIEWNG_NMPR_CO">관객 수</option>
            <option value="SALES_PRICE">매출</option>
            <option value="TOT_SCRN_CO">스크린 수</option>
          </Select>
        </SelectContainer>
        <CardList>
          {sortedMovies.map((movie) => (
            <Card key={movie.Source} onClick={() => handleCardClick(movie.Source)}>
              <CardTitle>{movie.MOVIE_NM}</CardTitle>
              <CardDescription><strong>감독:</strong> {movie.DRCTR_NM}</CardDescription>
              <CardDescription><strong>관객 수:</strong> {movie.VIEWNG_NMPR_CO?.toLocaleString() || "N/A"}</CardDescription>
              <CardDescription><strong>매출:</strong> {movie.SALES_PRICE?.toLocaleString() || "N/A"}</CardDescription>
            </Card>
          ))}
        </CardList>
      </Container>
    </>
  );
};

export default Rank;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SelectContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 1200px;
  text-align: right;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const Card = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;
