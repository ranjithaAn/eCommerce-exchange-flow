import React, { Component } from 'react'
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default class ExchangeModal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {exchangeModalOpen,exchangeCloseModal} =value;
                    //const {img, title,price} = value.modalProduct;
                    if(!exchangeModalOpen){
                        return null;
                    }else{
                        return (
                            < ExchangeModalContainer >
                                <div className="container">
                                    <div className="row">
                                        <div id="exchangeModal" className=
                                            "col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5">
                                            <h5>Exchange Old Phone</h5>
                                            <h5 >Which phone do you have?</h5>
                                            <p className="text-muted"> To check phone model, go to "Settings > System > About phone".  Phone will be picked only if brand & model checked at doorstep matches the one selected here. </p>
                                            
                                            <Link to='/'>
                                                <ButtonContainer onClick={()=>exchangeCloseModal()}>
                                                    continue shopiing
                                                </ButtonContainer>
                                            </Link>
                                            <Link to='/cart'>
                                                <ButtonContainer cart onClick={() => exchangeCloseModal()}>
                                                    go to cart
                                                </ButtonContainer>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ExchangeModalContainer>
                        );
                    }

                }}
            </ProductConsumer>
        );
    }
}
const ExchangeModalContainer =styled.div`
position:fixed;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(0,0,0,0.3);
display:flex;
align-items:center;
justify-content:center;
#exchangeModal{
    background:var(--mainWhite);
}
`;