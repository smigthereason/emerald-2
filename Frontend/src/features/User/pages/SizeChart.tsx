import React from 'react';
import Title from "../components/Title";

const SizeChart: React.FC = () => {
  const sizeData = [
    { 
      size: 'XS', 
      sizeUK: '6-8', 
      bust: '29"-31"', 
      waist: '24"-26"', 
      hips: '34"-36"' 
    },
    { 
      size: 'S', 
      sizeUK: '8-10', 
      bust: '32"-34"', 
      waist: '27"-29"', 
      hips: '37"-39"' 
    },
    { 
      size: 'M', 
      sizeUK: '10-12', 
      bust: '35"-37"', 
      waist: '30"-32"', 
      hips: '40"-42"' 
    },
    { 
      size: 'L', 
      sizeUK: '12-14', 
      bust: '38"-40"', 
      waist: '33"-35"', 
      hips: '43"-45"' 
    },
    { 
      size: 'XL', 
      sizeUK: '14-16', 
      bust: '41"-43"', 
      waist: '36"-38"', 
      hips: '46"-48"' 
    },
    { 
      size: '2XL', 
      sizeUK: '18-20', 
      bust: '44"-46"', 
      waist: '39"-41"', 
      hips: '49"-51"' 
    },
    { 
      size: '3XL', 
      sizeUK: '20-22', 
      bust: '47"-50"', 
      waist: '42"-43"', 
      hips: '52"-54"' 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Title highlightText="Size" mainText="Chart" />
      <p className="text-center text-gray-600 mb-6">
        Select the size that most closely matches your body measurements.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left font-semibold text-gray-700">Sizes</th>
              <th className="border p-3 text-left font-semibold text-gray-700">Size UK</th>
              <th className="border p-3 text-left font-semibold text-gray-700">Bust (in)</th>
              <th className="border p-3 text-left font-semibold text-gray-700">Waist (in)</th>
              <th className="border p-3 text-left font-semibold text-gray-700">Hips (in)</th>
            </tr>
          </thead>
          <tbody>
            {sizeData.map((row, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="border p-3 font-medium text-gray-800">{row.size}</td>
                <td className="border p-3 text-gray-600">{row.sizeUK}</td>
                <td className="border p-3 text-gray-600">{row.bust}</td>
                <td className="border p-3 text-gray-600">{row.waist}</td>
                <td className="border p-3 text-gray-600">{row.hips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChart;