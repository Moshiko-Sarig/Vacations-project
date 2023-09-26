-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2022 at 07:36 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vaction_mood_db`
--
CREATE DATABASE IF NOT EXISTS `vaction_mood_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vaction_mood_db`;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `user_name` text NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `vacations_followed` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`vacations_followed`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `is_admin`, `user_name`, `first_name`, `last_name`, `password`, `vacations_followed`) VALUES
(1, 1, 'admin', 'Mosihko', 'Sarig', 'admin', ''),
(14, 0, 'Yotam', 'user', 'user', 'Yotam123', '[5,19]'),
(17, 0, 'Shmuel', 'Shmuel', 'Choen', 'Shmuel123', '[21,20,19]');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacation_id` int(11) NOT NULL,
  `vacation_description` varchar(40) NOT NULL,
  `description_destination` varchar(30) NOT NULL,
  `vacation_picture` text NOT NULL,
  `vacation_start_date` date NOT NULL,
  `vacation_end_date` date NOT NULL,
  `vacation_price` int(11) NOT NULL,
  `vacation_followers` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacation_id`, `vacation_description`, `description_destination`, `vacation_picture`, `vacation_start_date`, `vacation_end_date`, `vacation_price`, `vacation_followers`) VALUES
(4, 'The capital city of Israel', 'Jerusalem', 'Jerusalem.jpg', '2023-02-10', '2023-02-18', 500044444, 0),
(5, 'Exposure to a special culture', 'Shangi', 'Shanghai.jpg', '2023-01-07', '2023-01-09', 2500, 1),
(19, 'World champion in soccer ', 'Argentina', 'Argentina.jpg', '2023-02-01', '2023-02-11', 4000, 2),
(20, 'lovely and warm city', 'Madrird', 'madrird.jpg', '2023-02-19', '2023-02-25', 10000, 1),
(21, 'Relaxing beach and environment', 'Maldives', 'Maldives.jpg', '2023-01-01', '2023-01-07', 15000, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
