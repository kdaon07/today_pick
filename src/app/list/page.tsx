"use client";

import styled from "styled-components";
import movieData from "../../../public/movie.json";
import { useRouter } from "next/navigation";
import Header from "@/components/header";

const List = () => {
    const router = useRouter();

    const handleCardClick = (source:any) => {
        router.push(`/detail/${source}`);
    };

    return (
        <>
            <Header />
            <Container>
                <CardList>
                    {movieData
                        .filter((movie) => movie.GRAD_NM !== "청소년관람불가" && movie.MOVIE_NM !== null)
                        .map((movie) => (
                            <Card key={movie.Source}
                                onClick={() => handleCardClick(movie.Source)}>
                                <CardTitle>{movie.MOVIE_NM}</CardTitle>
                                <CardDescription>{movie.DRCTR_NM}</CardDescription>
                                <CardDescription>{movie.GRAD_NM}</CardDescription>
                            </Card>
                        ))}
                </CardList>
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