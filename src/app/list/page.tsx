"use client";

import styled from "styled-components";
import movieData from "../../../public/movie.json";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import { useState } from "react";

const List = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCardClick = (source: any) => {
    router.push(`/detail/${source}`);
  };

  const filteredMovies = movieData.filter((movie) => {
    const isNotRestricted = movie.GRAD_NM !== "청소년관람불가";
    const matchesSearchQuery = movie.MOVIE_NM?.includes(searchQuery) || movie.DRCTR_NM?.includes(searchQuery);
    return isNotRestricted && matchesSearchQuery;
  });

  return (
    <>
      <Header />
      <Container>
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="영화 제목 또는 감독 이름을 검색하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchBar>
        <CardList>
          {filteredMovies.map((movie) => (
            <Card key={movie.Source} onClick={() => handleCardClick(movie.Source)}>
              <CardTitle>{movie.MOVIE_NM}</CardTitle>
              <CardDescription>{movie.DRCTR_NM}</CardDescription>
              <CardDescription>{movie.GRAD_NM}</CardDescription>
            </Card>
          ))}
        </CardList>
        {filteredMovies.length === 0 && <NoResults>검색 결과가 없습니다.</NoResults>}
      </Container>
    </>
  );
};

export default List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const SearchBar = styled.div`
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

const NoResults = styled.div`
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
`;
