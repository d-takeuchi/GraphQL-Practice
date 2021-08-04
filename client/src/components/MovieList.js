import React from "react";
import { useQuery } from "@apollo/client";
import { Card, CardBody, Table,Button } from "reactstrap";

import { MOVIE_LIST,DELELTE_MOVIE } from "../queries/queries";
import { useMutation } from "@apollo/react-hooks";


const MovieList = ()=>{

  const {loading,error,data} = useQuery(MOVIE_LIST);

  const [deleteMovie] = useMutation(DELELTE_MOVIE,{refetchQueries:[{query:MOVIE_LIST}],awaitRefetchQueries:true});

  const handleDeleteMovie = id => {
    deleteMovie({variables:{id}});
  }

  if(loading){
    return <p>Loading...</p>
  }else if(error){
    return <p>Error</p>
  }else{
    return(
      <Card>
        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>タイトル</th>
                <th>ジャンル</th>
                <th colSpan="2">監督</th>
              </tr>
            </thead>
            <tbody>
              {
                data.movies.map(({id,name,genre,director}) =>(
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{genre}</td>
                    <td>{director.name}</td>
                    <td><Button color="danger" onClick={()=>handleDeleteMovie(id)}>削除</Button></td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </CardBody>
      </Card>
    )
  }
}
export default MovieList;