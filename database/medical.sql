-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 07:40 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `health_predictor_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `ID` int(100) NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `CountryCode` int(5) NOT NULL,
  `PhoneNumber` int(50) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`ID`, `FirstName`, `LastName`, `email`, `Username`, `CountryCode`, `PhoneNumber`, `Gender`, `Password`) VALUES
(0, '', '', '', 'iMercy', 0, 0, '', '123456789'),
(0, 'Precious', 'Odi', 'odi@gmail.com', 'Precious', 93, 55555555, 'female', '1234567'),
(0, 'Queen', 'Esther', 'esther@gmail.com', 'Queen', 355, 2222222, 'female', '25f9e794323b453885f5181f1b624d0b'),
(0, '', '', '', '', 0, 0, '', ''),
(0, 'Pageo', 'Leo', 'pageo@gmail.com', 'pageo', 355, 2222222, 'male', 'fcea920f7412b5da7be0cf42b8c93759');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
