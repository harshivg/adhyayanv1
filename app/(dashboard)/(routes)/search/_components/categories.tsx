"use client";
import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import {
    FcDataSheet,
    FcDebian,
    FcMusic
}
from "react-icons/fc";
import { CategoryItem } from "./category-item";

interface CategoriesProps{
    items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
    "Web Development": FcMusic,
    "Mobile Development": FcDebian,
    "Data Science": FcDataSheet,
    "Machine Learning": FcDataSheet,
    "UI/UX": FcDataSheet,
    "Game Development": FcDataSheet,
    "Cybersecurity": FcDataSheet,
    "Cloud Computing": FcDataSheet,
    "DevOps": FcDataSheet,
    "Digital Marketing": FcDataSheet,
    "Business": FcDataSheet,
    "Finance": FcDataSheet,
}

export const Categories = ({ items } : CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2 invisible-scrollbar">
            {items.map((item) => (
                <CategoryItem 
                    key={item.id}
                    icon={iconMap[item.name]}
                    label={item.name}
                    value={item.id}
                />
            ))}
        </div>
    )
}