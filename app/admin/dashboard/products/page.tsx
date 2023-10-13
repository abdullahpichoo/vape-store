import { DataTable } from "@/components/ui/data-table";
import { ProductType } from "@/types/api/product";

import { columns } from "./columns";

const getData = async (): Promise<ProductType[]> => {
  return [
    {
      _id: "1",
      name: "Airpods Wireless Bluetooth Headphones",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
      brand: "Apple",
      category: "Electronics",
      price: 89.99,
      countInStock: 10,
      rating: 4.5,
      trending: true,
    },
    {
      _id: "2",
      name: "iPhone 11 Pro 256GB Memory",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
      brand: "Apple",
      category: "Electronics",
      price: 599.99,
      countInStock: 7,
      rating: 4.0,
      trending: true,
    },
    {
      _id: "3",
      name: "Cannon EOS 80D DSLR Camera",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
      brand: "Cannon",
      category: "Electronics",
      price: 929.99,
      countInStock: 5,
      rating: 3,
      trending: false,
    },
    {
      _id: "4",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "5",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "6",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "7",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "8",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "9",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "10",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "11",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
    {
      _id: "12",
      name: "Sony Playstation 4 Pro White Version",
      images: [
        {
          public_id: "products/airpods.jpg",
          url: "/images/airpods.jpg",
        },
      ],
      description:
        "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
      brand: "Sony",
      category: "Electronics",
      price: 399.99,
      countInStock: 11,
      rating: 5,
      trending: false,
    },
  ];
};

const DashboardProducts = async () => {
  const productsData = await getData();

  return (
    <div className="container mx-auto py-5">
      <DataTable columns={columns} data={productsData} />
    </div>
  );
};

export default DashboardProducts;
