-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2023 at 12:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medical`
--
CREATE DATABASE IF NOT EXISTS `medical` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `medical`;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
CREATE TABLE `doctors` (
  `Firstname` int(11) NOT NULL,
  `Lastname` int(11) NOT NULL,
  `Email` int(11) NOT NULL,
  `Password` int(11) NOT NULL,
  `CountryCode` int(11) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `Gender` int(11) NOT NULL,
  `Location` int(11) NOT NULL,
  `Specialization` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE `patients` (
  `Firstname` text NOT NULL,
  `Lastname` text NOT NULL,
  `Email` varchar(11) NOT NULL,
  `Username` text NOT NULL,
  `CountryCode` varchar(11) NOT NULL,
  `PhoneNumber` int(11) NOT NULL,
  `Gender` text NOT NULL,
  `Password` varchar(11) NOT NULL,
  `Id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`Firstname`, `Lastname`, `Email`, `Username`, `CountryCode`, `PhoneNumber`, `Gender`, `Password`, `Id`) VALUES
('chu', 'gana', 'chugana@gma', 'chugana', '237', 677959361, 'male', '23456789', 1),
('John', 'Syndy', 'johnsyndy@g', 'johnsyndy', '355', 985456785, 'male', 'FASDMSA', 2),
('ndo', 'kama', 'ndokama@mai', 'ndokama23', '1242', 87656783, 'male', 'adjltewfs', 3),
('fad', 'kon', 'fadkon@gmai', 'fadkon', '238', 2147483647, 'female', '95dfbc2a96e', 4),
('FONSAH', 'ASHU', 'ashprincepa', 'AshPrince', '237', 675416098, 'male', 'ashprince', 5),
('Lum', 'Susan', 'lumsusan@gm', 'LumSuzy', '225', 5247941, 'female', 'LumSusan123', 8);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `Id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
