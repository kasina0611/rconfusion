import React,{Component} from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem,ModalBody,Modal,ModalHeader,Button,Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control,LocalForm,Errors} from 'react-redux-form';

const maxLength=len=>val=>!(val)||(val.length<=len);
const minLength=len=>val=>(val)&&(val.length>=len);
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    handleSubmit(values){
        this.toggleModal();
        console.log("Current state is:"+JSON.stringify(values));
        alert("Current State is:"+JSON.stringify(values));
    }
    render(){
        return(
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-edit fa-lg"> Submit Comment</span>
            </Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating"
                                className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="name">Name</Label>
                            <Control.text model=".name" id="name" name="name"
                                className="form-control"
                                validators={{
                                    minLength:minLength(3),maxLength:maxLength(15)
                                }}/>
                            <Errors className="text-danger" model=".name" show="touched"
                                messages={{
                                    minLength:'Must be greater than 2 characters',
                                    maxLength:'Must be less than 15 characters'
                                }}/>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="message">Your Comment</Label>
                            <Control.textarea model=".message" id="message" name="message" rows="6"
                                className="form-control"/>
                        </div>
                        <div className="form-group">
                            <Button type="submit" color="primary">
                            Submit
                            </Button>
                        </div>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    }
}
function RenderComments({comments}){
    if(comments){
        const feedback=comments.map((comment)=>{
            return(
                <ul className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li className="mt-3">-- {comment.author},{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</li>
                </ul>
            );
        });
        return(
            <div>
                <h4>Comments</h4>
                {feedback}
                <CommentForm/>
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
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
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
                    <RenderComments comments={props.comments}/>
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