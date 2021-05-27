import React,{Component} from 'react';
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props);
    }
    renderComments(comments){
        if(comments){
            const feedback=this.props.dish.comments.map((comment)=>{
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
    render(){
        if(this.props.dish!=null){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name}></CardImg>
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
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
}

export default Dishdetail;