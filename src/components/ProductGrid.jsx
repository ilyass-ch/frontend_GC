import React from "react";

const FilterSidebar = () => {
  return (
    <div className="w-full lg:w-1/4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Filtres</h2>
      <div className="mb-4">
        <label className="block font-medium">Catégorie</label>
        <select className="w-full border rounded p-2 mt-1">
          <option>Tout</option>
          <option>Électronique</option>
          <option>Vêtements</option>
          <option>Maison</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-medium">Prix maximum</label>
        <input type="number" className="w-full border rounded p-2 mt-1" />
      </div>
      <button className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600">
        Appliquer les filtres
      </button>
    </div>
  );
};

export default FilterSidebar;
