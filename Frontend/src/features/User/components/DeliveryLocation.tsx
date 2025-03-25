import { useState, useEffect } from 'react';

type DeliveryLocations = {
  [key: string]: {
    points: string[];
    rate: number;
  };
  };

  interface DeliveryLocationProps {
    onShippingCostChange: (cost: number) => void;
    onLocationChange: (location: string) => void;
  }

 

const DeliveryLocation = ({ onShippingCostChange, onLocationChange }: DeliveryLocationProps) => {
  const [selectedRegion, setSelectedRegion] = useState<keyof DeliveryLocations | ''>('');
  const [selectedPoint, setSelectedPoint] = useState('');
  const [shippingCost, setShippingCost] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deliveryLocations: DeliveryLocations = {
    'CBD': {
      points: ['Kimathi Street', 'Moi Avenue', 'Tom Mboya Street', 'Railways'],
      rate: 150
    },
    'Westlands': {
      points: ['Sarit Center', 'Westgate Mall', 'The Mall Westlands', 'Diamond Plaza'],
      rate: 180
    },
    'Eastlands': {
      points: ['Buruburu Phase 1', 'Umoja 1', 'Donholm', 'Kayole Junction'],
      rate: 160
    },
    'Karen': {
      points: ['Karen Hub', 'Karen Square', 'Waterfront'],
      rate: 200
    },
    'Kilimani': {
      points: ['Yaya Centre', 'Adlife Plaza', 'Kilimani Business Center'],
      rate: 170
    },
    'South B/C': {
      points: ['South B Shopping Center', 'Capital Center', 'NextGen Mall'],
      rate: 160
    },
    'Kasarani': {
      points: ['TRM', 'Kasarani Shopping Center', 'Safari Park'],
      rate: 180
    }
  };

  useEffect(() => {
    if (selectedRegion) {
      const newShippingCost = deliveryLocations[selectedRegion].rate;
      setShippingCost(newShippingCost);
      onShippingCostChange(newShippingCost);
    } else {
      setShippingCost(0);
      onShippingCostChange(0);
    }
  }, [selectedRegion, deliveryLocations, onShippingCostChange]);

  useEffect(() => {
    if (selectedPoint) {
      onLocationChange(`${selectedPoint}, ${selectedRegion}`);
    } else {
      onLocationChange('');
    }
  }, [onLocationChange, selectedPoint, selectedRegion]);

  return (
    <div>
      {/* Delivery Location */}
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-700">
          Delivery Location
        </h2>
        <div className="mt-2 space-y-4 ">
          {/* Region Selection */}
          <div>
                   <select
              value={selectedRegion}
              onChange={(e) => {
                setSelectedRegion(e.target.value as keyof DeliveryLocations);
                setSelectedPoint('');
              }}
              className=" pay bg-white w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d66161] focus:border-transparent"
            >
              <option value="" >Select Region</option>
              {Object.keys(deliveryLocations).map((region) => (
                <option key={region} value={region} className='pay bg-white' >
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Pickup Point Selection */}
          {selectedRegion && (
            <div>
              <select
                value={selectedPoint}
                onChange={(e) => setSelectedPoint(e.target.value)}
                className="pay bg-white w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d66161] focus:border-transparent"
              >
                <option value=""  >Select Pickup Point</option>
                {deliveryLocations[selectedRegion].points.map((point) => (
                  <option key={point} value={point} >
                    {point}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Shipping Cost */}
      <div className="mt-6 flex justify-between">
        <span className="text-gray-600">Shipping Cost</span>
        <span className="font-medium">
          KSH {shippingCost.toFixed(2)}
        </span>
      </div>

      {selectedPoint && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Your order will be delivered to Pick Up Mtaani point at: {selectedPoint}, {selectedRegion}
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryLocation;

