// src/App.js
import './App.css';
import CartView from './components/CartView';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <section className="products-section">
          <ProductGrid />
        </section>

        <aside className="cart-section">
          <CartView />
        </aside>
      </main>

      <footer className="footer">
        <small>Built for shopping</small>
      </footer>
    </div>
  );
}

export default App;
