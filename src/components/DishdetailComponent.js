import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle} from 'reactstrap';


    function RenderComments({comments}){
        if(comments){
            const feedback=comments.map((comment)=>{
                return(
                    <ul className="list-unstyled">
                        <li>--{comment.comment}</li>
                        <li>{comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                    </ul>
                );
            });
            return(
                <div>
                    <h4>Comments</h4>
                    {feedback}
                </div>
            );
        }else{
            return(
                <div></div>
            );
        }
    }
    const Dishdetail=(props)=>{
        if(props.dish!=null){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={props.dish.image} alt={props.dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.dish.comments}/>
                    </div>
                </div>
            </div>
        );
        }else{
            return(
                <div></div>
            )
        }
    }

export default Dishdetail;