import React, { Component } from "react";
import { storeProducts, detailProduct, topBrands, models,defaultModel } from "./data";
const ProductContext = React.createContext();

class ProductProvider extends Component {
    state = {
        products: [],
        detailProduct: detailProduct,
        cart: [],
        modalOpen: false,
        exchangeModalOpen: false,
        exchangeSummaryModalOpen: false,
        modalProduct: detailProduct,
        cartSubTotal: 0,
        cartTax: 0,
        cartTotal: 0,
        brands: [],
        selectOptions : [],
        id: "",
        name: '',
        modelList: [],
        models: [],
        modelsByBrand: defaultModel,
        selectedExchangeModel: "",
        selectedExchangeValue: "",
        allModels: [],
        exchange: false
    };
    componentDidMount() {
        this.setProducts();
        this.setBrands();
        this.setModels();
    }
    setSelectedExchangeBrand = id => {
        this.setState(() => {
           return {selectedExchangeBrand: id, modelsByBrand: this.getModelsByBrand(id) }
        })
    }
    setSelectedExchangeModel = id => {
        const brandModel = this.getModels().find(item => item.title === id) ;
        this.setState(() => {
            return {selectedExchangeModel: id, selectedExchangeValue: brandModel.exchangeValue }
        })
    }
/*    setSelectedExchangeValue = id => {
        const brandModel = this.state.models.find(item => item.id === parseInt(id,10)) ;
        this.setState(() => {
            return {selectedExchangeValue: brandModel.exchangeValue }
        })
    }*/
    setExchange = () => {
        this.setState({exchange: true});
    }
    
    setProducts = () => {
        let products = [];
        storeProducts.forEach(item => {
            const singleItem = { ...item };
            products = [...products, singleItem];
        });
        this.setState(() => {
            return { products };
        }, this.checkCartItems);
    };

    setBrands = () => {
        let brands = [];
        topBrands.forEach(item => {
            const singleItem = {...item};
            brands = [...brands, singleItem];
        });
        this.setState(() => {
            return { brands };
        });
    };
    getItem = id => {
        const product = this.state.products.find(item => item.id === parseInt(id,10));
        return product;
    };

    setModels = () => {
        let modelList = [];
        models.forEach(item => {
            const singleItem = {...item};
            modelList = [...models, singleItem];
        });
        this.setState(() => {
            return { modelList };
        });
    };

    getModels = () => {
        let models = this.state.modelsByBrand.models;
        //this.setModelsList(models);
            return models;
    };
/*
    setModelsList(models) {
    this.setState(() => {
        return {allmodels: models}
    })
    }*/
    getModelsByBrand = id => {
        const modelsByBrand = this.state.modelList.find(item => item.id === parseInt(id,10));
        const models = modelsByBrand.models;
        this.setState(() => {
            return { modelsByBrand: modelsByBrand, models: models}
        });
    };
    
    handleDetail = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { detailProduct: product };
        });
    };
    addToCart = id => {
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(() => {
            return {
                products: [...tempProducts],
                cart: [...this.state.cart, product],
                detailProduct: { ...product }
            };
        }, this.addTotals);
    };
    openModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, modalOpen: true };
        });
    };
    exchangeOpenModal = id => {
        const product = this.getItem(id);
        this.setState(() => {
            return { modalProduct: product, exchangeModalOpen: true };
        });
    }
    openExchangeSummaryModal = id => {
     //   const product = this.getItem(id);
        this.setState(() => {
            return { exchangeSummaryModalOpen: true };
        });
    }
    closeModal = () => {
        this.setState(() => {
            return { modalOpen: false };
        });
    };
    exchangeCloseModal = () => {
        this.setState(() => {
            return { exchangeModalOpen: false };
        });
    };
    closeExchangeSummaryModal = () => {
        this.setState(() => {
            return { exchangeSummaryModalOpen: false };
        });
    };
    increment = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count + 1;
        product.total = product.count * product.price;
        this.setState(() => {
            return {
                cart: [...tempCart]
            };
        }, this.addTotals);
    };
    decrement = id => {
        let tempCart = [...this.state.cart];
        const selectedProduct = tempCart.find(item => {
            return item.id === id;
        });
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        product.count = product.count - 1;
        if (product.count === 0) {
            this.removeItem(id);
        } else {
            product.total = product.count * product.price;
            this.setState(() => {
                return { cart: [...tempCart] };
            }, this.addTotals);
        }
    };
    getTotals = () => {
        // const subTotal = this.state.cart
        //   .map(item => item.total)
        //   .reduce((acc, curr) => {
        //     acc = acc + curr;
        //     return acc;
        //   }, 0);
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total));
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;
        return {
            subTotal,
            tax,
            total
        };
    };
    addTotals = () => {
        const totals = this.getTotals();
        this.setState(
            () => {
                return {
                    cartSubTotal: totals.subTotal,
                    cartTax: totals.tax,
                    cartTotal: totals.total
                };
            },
            () => {
                // console.log(this.state);
            }
        );
    };
    removeItem = id => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct = tempProducts[index];
        removedProduct.inCart = false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        tempCart = tempCart.filter(item => {
            return item.id !== id;
        });

        this.setState(() => {
            return {
                cart: [...tempCart],
                products: [...tempProducts]
            };
        }, this.addTotals);
    };
    clearCart = () => {
        this.setState(
            () => {
                return { cart: [] };
            },
            () => {
                this.setProducts();
                this.addTotals();
            }
        );
    };
    render() {
        return (
            <ProductContext.Provider
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCart: this.addToCart,
                    openModal: this.openModal,
                    exchangeOpenModal: this.exchangeOpenModal,
                    openExchangeSummaryModal: this.openExchangeSummaryModal,
                    closeModal: this.closeModal,
                    closeExchangeSummaryModal: this.closeExchangeSummaryModal,
                    exchangeCloseModal: this.exchangeCloseModal,
                    increment: this.increment,
                    decrement: this.decrement,
                    removeItem: this.removeItem,
                    clearCart: this.clearCart,
                    getModels: this.getModels,
                    getModelsByBrand: this.getModelsByBrand,
                    setSelectedExchangeModel: this.setSelectedExchangeModel,
                    setExchange: this.setExchange,
                    setSelectedExchangeBrand: this.setSelectedExchangeBrand
                    
                }}
            >
                {this.props.children}
            </ProductContext.Provider>
        );
    }

  
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };  
