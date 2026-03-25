import React, { createContext, useContext, useState } from "react";
import SelectionSidebar from "./SelectionSidebar";
import Visualizer from "./Visualizer";

export type Category = "Suit" | "Shirt" | "Wedding";

export interface CustomizationState {
  category: Category;
  fabric: {
    id: string;
    name: string;
    textureUrl: string;
    color: string;
  };
  style: {
    lapel: string;
    buttons: number;
    pockets: string;
    fit: string;
    cuffs?: string;
    collar?: string;
  };
}

interface CustomizationContextType {
  state: CustomizationState;
  setCategory: (cat: Category) => void;
  setFabric: (fabric: CustomizationState["fabric"]) => void;
  setStyle: (style: Partial<CustomizationState["style"]>) => void;
}

const CustomizationContext = createContext<
  CustomizationContextType | undefined
>(undefined);

export const useCustomization = () => {
  const context = useContext(CustomizationContext);
  if (!context)
    throw new Error(
      "useCustomization must be used within CustomizationProvider",
    );
  return context;
};

const Configurator = () => {
  const [state, setState] = useState<CustomizationState>({
    category: "Suit",
    fabric: {
      id: "wool-1",
      name: "Premium Wool",
      textureUrl: "/assets/suities/Men/1225.jpg",
      color: "#36454F",
    },
    style: {
      lapel: "Notch",
      buttons: 2,
      pockets: "Flap",
      fit: "Slim",
    },
  });

  const setCategory = (category: Category) => {
    setState((prev) => ({
      ...prev,
      category,
      // Reset style defaults per category
      style:
        category === "Shirt"
          ? {
              lapel: "None",
              buttons: 7,
              pockets: "None",
              fit: "Slim",
              cuffs: "Single",
              collar: "Spread",
            }
          : { lapel: "Notch", buttons: 2, pockets: "Flap", fit: "Slim" },
    }));
  };

  const setFabric = (fabric: CustomizationState["fabric"]) => {
    setState((prev) => ({ ...prev, fabric }));
  };

  const setStyle = (styleUpdate: Partial<CustomizationState["style"]>) => {
    setState((prev) => ({
      ...prev,
      style: { ...prev.style, ...styleUpdate },
    }));
  };

  return (
    <CustomizationContext.Provider
      value={{ state, setCategory, setFabric, setStyle }}
    >
      <div className="flex h-full w-full relative overflow-hidden bg-[#0a0a0a]">
        {/* Left Visualizer Area */}
        <div className="flex-1 relative order-2 md:order-1">
          <Visualizer />
        </div>

        {/* Right Controls Area */}
        <div className="w-full md:w-[450px] lg:w-[500px] h-full z-10 order-1 md:order-2">
          <SelectionSidebar />
        </div>
      </div>
    </CustomizationContext.Provider>
  );
};

export default Configurator;
