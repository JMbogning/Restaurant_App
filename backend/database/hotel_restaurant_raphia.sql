-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2022 at 04:53 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 8.0.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données: `hotel_restaurant_raphia`
--
CREATE DATABASE IF NOT EXISTS `hotel_restaurant_raphia` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hotel_restaurant_raphia`;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Petit déjeuner', '2022-07-14 23:40:35', '2022-07-14 23:40:35'),
(2, 'déjeuner', '2022-07-14 23:56:10', '2022-07-14 23:56:10');

-- --------------------------------------------------------

--
-- Table structure for table `Clients`
--

CREATE TABLE `Clients` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT 'Address',
  `phone` varchar(255) NOT NULL DEFAULT '999999999',
  `email` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Clients`
--

INSERT INTO `Clients` (`id`, `name`, `address`, `phone`, `email`, `dni`, `createdAt`, `updatedAt`) VALUES
(1, 'Junior Mbogning', 'Odza', '694144521', 'juniormbogning@gmail.com', '2022-07-15 17:30:39', '2022-07-15 17:30:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `OrderProducts`
--

CREATE TABLE `OrderProducts` (
  `id` int NOT NULL,
  `quantity` int DEFAULT NULL,
  `orderId` int NOT NULL,
  `productId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `OrderProducts`
--

INSERT INTO `OrderProducts` (`id`, `quantity`, `orderId`, `productId`) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 1, 2, 1),
(4, 1, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int NOT NULL,
  `total` double NOT NULL,
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `delivery` tinyint(1) NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `userId` int NOT NULL,
  `clientId` int NOT NULL,
  `tableId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`id`, `total`, `isPaid`, `delivery`, `note`, `userId`, `clientId`, `tableId`, `createdAt`, `updatedAt`) VALUES
(1, 4000, 0, 1, 'RAS', 3, 1, NULL, '2022-07-18 14:29:19', '2022-07-18 14:29:19'),
(2, 4000, 0, 1, 'RAS', 3, 1, NULL, '2022-07-18 14:29:26', '2022-07-18 14:29:26');

-- --------------------------------------------------------

--
-- Table structure for table `Products`
--

CREATE TABLE `Products` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock` int NOT NULL,
  `categoryId` int NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Products`
--

INSERT INTO `Products` (`id`, `name`, `price`, `stock`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'Salade', 1000, 20, 2022, '2022-07-15 00:57:17', '2022-07-18 14:29:26'),
(2, 'Poulet', 3000, 15, 2022, '2022-07-15 08:06:58', '2022-07-18 14:29:26');

-- --------------------------------------------------------

--
-- Table structure for table `Tables`
--

CREATE TABLE `Tables` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `occupied` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Tables`
--

INSERT INTO `Tables` (`id`, `name`, `occupied`, `createdAt`, `updatedAt`) VALUES
(1, 'T3', 0, '2022-07-07 08:59:31', '2022-07-07 08:59:31'),
(2, 'T4', 0, '2022-07-07 08:59:51', '2022-07-07 08:59:51'),
(3, 'T1', 0, '2022-07-07 09:00:36', '2022-07-07 09:00:36'),
(4, 'T5', 0, '2022-07-12 15:33:29', '2022-07-12 15:33:29'),
(5, 'T4', NULL, '2022-07-12 15:37:01', '2022-07-12 15:37:01'),
(6, 'T4', NULL, '2022-07-12 15:37:23', '2022-07-12 15:37:23'),
(7, 'T4', NULL, '2022-07-12 15:37:45', '2022-07-12 15:37:45'),
(8, 'T6', NULL, '2022-07-12 15:41:03', '2022-07-12 15:41:03'),
(9, 'T7', 0, '2022-07-12 15:42:31', '2022-07-12 15:42:31'),
(10, 'T8', NULL, '2022-07-12 15:52:46', '2022-07-12 15:52:46'),
(11, 'T20', NULL, '2022-07-13 15:01:37', '2022-07-13 15:01:37'),
(12, 'T21', NULL, '2022-07-13 15:02:37', '2022-07-13 15:02:37'),
(13, 'T22', NULL, '2022-07-13 15:15:10', '2022-07-13 15:15:10'),
(14, 'T23', NULL, '2022-07-13 15:15:54', '2022-07-13 15:15:54'),
(15, 'T24', NULL, '2022-07-13 15:16:06', '2022-07-13 15:16:06'),
(16, 'T25', NULL, '2022-07-13 15:20:01', '2022-07-13 15:20:01'),
(17, 'T26', NULL, '2022-07-13 15:20:09', '2022-07-13 15:20:09'),
(18, 'T55', NULL, '2022-07-13 16:13:31', '2022-07-13 16:13:31'),
(19, 'T1', NULL, '2022-07-13 16:19:08', '2022-07-13 16:19:08'),
(20, 'T1', NULL, '2022-07-13 16:19:17', '2022-07-13 16:19:17'),
(21, 'T55', NULL, '2022-07-13 16:42:13', '2022-07-13 16:42:13'),
(22, 'T23', NULL, '2022-07-13 16:46:22', '2022-07-13 16:46:22');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '/avatar.png',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `image`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(3, 'Junior Mbogning', 'mbogning@gmail.com', '$2b$10$CjajlLeZt0ZiB307hjqsJ.xKEVoMnJc4y/84TAoP8Ecaoqi8/2fQe', '/avatar.png', 1, '2022-07-18 15:26:49', '2022-07-18 15:26:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Clients`
--
ALTER TABLE `Clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `dni` (`dni`);

--
-- Indexes for table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `clientId` (`clientId`),
  ADD KEY `tableId` (`tableId`);

--
-- Indexes for table `Products`
--
ALTER TABLE `Products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `Tables`
--
ALTER TABLE `Tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Clients`
--
ALTER TABLE `Clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `OrderProducts`
--
ALTER TABLE `OrderProducts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Products`
--
ALTER TABLE `Products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Tables`
--
ALTER TABLE `Tables`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
