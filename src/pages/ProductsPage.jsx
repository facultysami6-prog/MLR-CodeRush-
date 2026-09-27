import React from 'react';

import Products from '../components/Products';
import FindMarketHero from '../components/FindMarketHero';

export default function ProductsPage() {
  return (
    <div className="products-page-container min-h-screen flex flex-col bg-white">

      <FindMarketHero
        eyebrow="FreshFind Produce"
        label="Fresh from local growers"
        title="Discover fresh"
        highlight="seasonal produce."
        description="Explore fresh fruits, vegetables and seasonal produce from local growers and farmers markets."
        buttonText="Explore produce"
        scrollTarget="products-catalogue"
        trustTitle="Direct from local farmers"
        trustSubtitle="Hand-picked seasonal harvests"
      />

      <div id="products-catalogue" style={{ scrollMarginTop: '100px' }}>
        <Products />
      </div>
    </div>
  );
}
