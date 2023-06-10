import React, { Component } from 'react'
import styled from 'styled-components';
import {ProductConsumer} from '../context';
import {ButtonContainer} from './Button';
import {Link} from 'react-router-dom';

export default class ExchangeSummaryModal extends Component {
    render() {
        return (
            <ProductConsumer>
                {(value)=>{
                    const {exchangeSummaryModalOpen, closeExchangeSummaryModal, selectedExchangeModel,selectedExchangeValue } =value;
                    if(!exchangeSummaryModalOpen){
                        return null;
                    }else{
                        return (
                            < ExchangeModalContainer >
                                <div className="container">
                                    <div className="row">
                                        <div id="exchangeSummaryModal" className=
                                            "col-8 mx-auto col-md-6 col-lg-4 text-capitalize text-center p-5">
                                            <h5>Exchange Summary</h5>
                                            <p className="text-muted">Your device</p>
                                            <h6>{selectedExchangeModel}</h6>
                                            <p className="text-muted">Exchange value $ </p>
                                            <h6>{selectedExchangeValue}</h6>
                                            <h5> How Exchange Works </h5>
                                            <p className="text-muted"> 1.
                                                Your phone’s physical & functional condition will be checked at doorstep. Based on that, the price can range between ₹350 - ₹1,100
                                                Know about checks at delivery</p>
                                            <p className="text-muted">
                                                2.
                                                Brand & Model will be checked at doorstep. If brand/model doesn't match the order, phone will not be picked up. </p>
                                            <ButtonContainer cart onClick={()=> {
                                                value.closeExchangeSummaryModal();
                                                value.setExchange();
                                            }
                                            }>
                                                Confirm Exchange
                                            </ButtonContainer>
                                            <Link to='/'>
                                                <ButtonContainer onClick={()=>closeExchangeSummaryModal()}>
                                                    continue shopping
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
#exchangeSummaryModal{
    background:var(--mainWhite);
}
`;