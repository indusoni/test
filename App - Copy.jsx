import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component {
   render() {
      return (
         <div>
            Hello World!!!
         </div>
      );
   }
}

export default App;
class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
    constructor() {

        super();
       
         this.state = {
            items: {}
          }
    }
    componentDidMount() {
      gitHubApi().then(data => {
      this.setState({
        items: data
      });
    })

      /* fetch('http://live.shaadiapi.com/api/profiles/pSH96339478/?options=%7B%22profile%22%3A%7B%0D%0A%22fieldset%22%3A%5B%22appearance%22%2C%22basic%22%2C%22doctrine%22%2C%22location%22%2C%22profession%22%5D%7D%2C%0D%0A%22photo%22%3A%7B%22fieldset%22%3A%5B%22photos%22%5D%2C%22profile_photo%22%3A%22true%22%2C%22size%22%3A%5B%22small%22%5D%7D%2C%0D%0A%22derived%22%3A%7B%22fieldset%22%3A%5B%22chat_details%22%5D%0D%0A%7D%7D&profileids=pSH96339478%2Cmuslim_23%2C3FS67675345&access_token=738CCCD4FDA172441F216712A488DCA61490000034|pSH96339478|') 
            .then(result=> {

                if(result.ok){
                  result.json().then(function (historyData) {
              alert(result.ok);
            
              this.setState({items:historyData});
            
            })
            .catch(function (error) {

                console.log(error.message);
            
            });
                }
                
            });*/
            

    }
    render() {
 alert("sdsdsda+++ ");
      return (
        <div>
        
          <SearchBar />

          <ProductTable products={this.props.products} />
        </div>
      );
    }
}


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

const gitHubApi = () => {
  return fetch('http://live.shaadiapi.com/api/profiles/pSH96339478/?options=%7B%22profile%22%3A%7B%0D%0A%22fieldset%22%3A%5B%22appearance%22%2C%22basic%22%2C%22doctrine%22%2C%22location%22%2C%22profession%22%5D%7D%2C%0D%0A%22photo%22%3A%7B%22fieldset%22%3A%5B%22photos%22%5D%2C%22profile_photo%22%3A%22true%22%2C%22size%22%3A%5B%22small%22%5D%7D%2C%0D%0A%22derived%22%3A%7B%22fieldset%22%3A%5B%22chat_details%22%5D%0D%0A%7D%7D&profileids=pSH96339478%2Cmuslim_23%2C3FS67675345&access_token=738CCCD4FDA172441F216712A488DCA61490000034|pSH96339478|') 
    .then(response => {
      return response.json()
        .then(({login, avatar_url, html_url}) =>  ({ login, avatar_url, html_url }));
    })
    .catch(error => {
      throw error;
    })
};

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('container')
);
