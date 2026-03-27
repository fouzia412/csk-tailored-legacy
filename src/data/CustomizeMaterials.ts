import { customizeSuitMaterials } from './customizeSuitMaterials';
import { customizeShirtMaterials } from './customizeShirtMaterials';
import { customizeWeddingMaterials } from './customizeWeddingMaterials';

export type OutfitType = "Suit" | "Shirt" | "Wedding outfit";
export type ViewType = "front" | "left" | "right";

export type FabricPattern =
    | "solid"
    | "stripe"
    | "check"
    | "grid"
    | "linen"
    | "jacquard"
    | "velvet"
    | "brocade"
    | "dobby"
    | "herringbone"
    | "dot"
    | "birdseye"
    | "houndstooth"
    | "matte"
    | "print"
    | "sheen";

export type MaterialItem = {
    id: string;
    outfit: OutfitType;
    name: string;
    family: string;
    subLabel: string;
    defaultColor: string;
    colors: string[];
    pattern?: FabricPattern;
    premium?: boolean;
    lightweight?: boolean;
    textureImage?: string;
};

export const outfitOptions: OutfitType[] = ["Suit", "Shirt", "Wedding outfit"];
export const viewOptions: ViewType[] = ["front", "left", "right"];
export const outfitImageAssets = {
    Suit: {
        front: {
            base: "/customize/suit/front.png",
            mask: "/customize/suit/front-mask.png",
            detail: "/customize/suit/front-detail.png",
        },
        left: {
            base: "/customize/suit/left.png",
            mask: "/customize/suit/left-mask.png",
            detail: "/customize/suit/left-detail.png",
        },
        right: {
            base: "/customize/suit/right.png",
            mask: "/customize/suit/right-mask.png",
            detail: "/customize/suit/right-detail.png",
        },
    },
    Shirt: {
        front: {
            base: "/customize/shirt/front.png",
            mask: "/customize/shirt/front-mask.png",
            detail: "/customize/shirt/front-detail.png",
        },
        left: {
            base: "/customize/shirt/left.png",
            mask: "/customize/shirt/left-mask.png",
            detail: "/customize/shirt/left-detail.png",
        },
        right: {
            base: "/customize/shirt/right.png",
            mask: "/customize/shirt/right-mask.png",
            detail: "/customize/shirt/right-detail.png",
        },
    },
    "Wedding outfit": {
        front: {
            base: '/customize/wedding/front.png',
            mask: '/customize/wedding/front-mask.png',
            detail: '/customize/wedding/front-detail.png'
        },
        left: {
            base: '/customize/wedding/left.png',
            mask: '/customize/wedding/left-mask.png',
            detail: '/customize/wedding/left-detail.png'
        },
        right: {
            base: '/customize/wedding/right.png',
            mask: '/customize/wedding/right-mask.png',
            detail: '/customize/wedding/right-detail.png'
        },
    },
} as const;

export const customizeMaterials: MaterialItem[] = [
    ...customizeSuitMaterials,
    ...customizeShirtMaterials,
    ...customizeWeddingMaterials
];