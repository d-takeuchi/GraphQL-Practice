import React from "react";
import { Button, Card, CardBody, CardHeader, Form, FormGroup } from "reactstrap";
import { useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

import { ADD_MOVIE, DIRECTOR_LIST, MOVIE_LIST,ADD_DIRECTOR } from "../queries/queries";
import { useMutation } from "@apollo/react-hooks";

const SideNav = ()=>{

  const {data} = useQuery(DIRECTOR_LIST);
  
  const { register,handleSubmit } = useForm();
  const { register:registerDirector,handleSubmit:handleSubmitDirector } = useForm();

  const [addMovie] = useMutation(ADD_MOVIE,{refetchQueries:[{query:MOVIE_LIST}],awaitRefetchQueries:true});
  const [addDirector] = useMutation(ADD_DIRECTOR,{refetchQueries:[{query:DIRECTOR_LIST}],awaitRefetchQueries:true});

  const onSubmit= ({movieName,movieGenre,directorId},event) => {
    addMovie({variables:{name:movieName,genre:movieGenre,directorId}})
    event.target.reset();
  };
  const onSubmitDirector = ({directorName,directorAge},event) => {
    const intAge = parseInt(directorAge);
    addDirector({variables:{name:directorName,age:intAge}});
    event.target.reset();
  }

  return (
    <div>
      <Card>
        <CardHeader>
          映画監督
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmitDirector(onSubmitDirector)}>
            <FormGroup>
              <input className="form-control" type="text" name="directorName" placeholder="監督名を入力してください" ref={registerDirector}/>
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="number" name="directorAge" placeholder="年齢" ref={registerDirector}/>
            </FormGroup>
            <Button color="primary" type="submit">追加</Button>
          </Form>
        </CardBody>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          映画作品
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <input className="form-control" type="text" name="movieName" placeholder="タイトル" ref={register}/>
            </FormGroup>
            <FormGroup>
              <input className="form-control" type="text" name="movieGenre" placeholder="ジャンル" ref={register}/>
            </FormGroup>
            <FormGroup>
              <select className="form-control" type="select" name="directorId" ref={register}>
                {data && data.directors.map(({id,name}) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </FormGroup>
            <Button color="primary" type="submit">追加</Button>
          </Form>
        </CardBody>
      </Card>      
    </div>
  )
}

export default SideNav;