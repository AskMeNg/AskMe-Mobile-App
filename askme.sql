-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 15, 2015 at 05:37 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `askme`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_no` int(11) NOT NULL,
  `post_parent` int(11) NOT NULL,
  `post_content` varchar(500) NOT NULL,
  `post_type` varchar(50) NOT NULL,
  `content_type` varchar(10) NOT NULL,
  `post_author` varchar(50) NOT NULL,
  `post_status` varchar(20) NOT NULL,
  `date_time` varchar(100) NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `producttype`
--

CREATE TABLE IF NOT EXISTS `producttype` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_no` int(11) NOT NULL,
  `product_parent` int(11) NOT NULL,
  `product_author` varchar(50) NOT NULL,
  `date_time` varchar(50) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `producttype_description`
--

CREATE TABLE IF NOT EXISTS `producttype_description` (
  `p_description_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_description_Name` varchar(50) NOT NULL,
  `p_description_author` varchar(50) NOT NULL,
  `languagecode` varchar(3) NOT NULL,
  `date_time` varchar(50) NOT NULL,
  PRIMARY KEY (`p_description_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `producttype_description`
--

INSERT INTO `producttype_description` (`p_description_id`, `p_description_Name`, `p_description_author`, `languagecode`, `date_time`) VALUES
(1, 'Burger', '1', 'eng', ''),
(2, 'Hotel Reservation', '6', 'eng', '21:46:54'),
(3, 'dummy', '6', 'eng', '1441869082');

-- --------------------------------------------------------

--
-- Table structure for table `registered_user`
--

CREATE TABLE IF NOT EXISTS `registered_user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userTitle` varchar(20) NOT NULL,
  `userLastName` varchar(20) NOT NULL,
  `userFirstName` varchar(20) NOT NULL,
  `userEmail` varchar(100) NOT NULL,
  `userPhone` varchar(20) NOT NULL,
  `userDob` varchar(50) NOT NULL,
  `userType` varchar(10) NOT NULL,
  `userPassword` varchar(200) NOT NULL,
  `userPostCode` varchar(30) NOT NULL,
  `userAddress` varchar(100) NOT NULL,
  `userCity` varchar(30) NOT NULL,
  `userState` varchar(30) NOT NULL,
  `userCountry` varchar(30) NOT NULL,
  `userNationality` varchar(30) NOT NULL,
  `userRank` varchar(30) NOT NULL,
  `userJoined` varchar(30) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `service_no` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `service_industry` varchar(100) NOT NULL,
  `service_state` varchar(50) NOT NULL,
  `service_localg` varchar(50) NOT NULL,
  `service_streetA` varchar(100) NOT NULL,
  `date_created` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  PRIMARY KEY (`service_no`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_no`, `service_name`, `service_industry`, `service_state`, `service_localg`, `service_streetA`, `date_created`, `author`) VALUES
(1, 'chicken Peroro', 'Restaurant and Bars', 'Lagos', 'Ikeja', '1 Olushola Adedokun Street', '1442323935', ''),
(2, 'Burger King', 'Fast Food', 'Lagos', 'Surulere', 'Obalende', '1442328004', '');

-- --------------------------------------------------------

--
-- Table structure for table `servicetype`
--

CREATE TABLE IF NOT EXISTS `servicetype` (
  `type_no` int(11) NOT NULL AUTO_INCREMENT,
  `service_no` int(11) NOT NULL,
  `servicetype_no` int(11) NOT NULL,
  `servicetype_author` varchar(10) NOT NULL,
  `date_time` varchar(50) NOT NULL,
  PRIMARY KEY (`type_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `servicetype_description`
--

CREATE TABLE IF NOT EXISTS `servicetype_description` (
  `service_number` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(50) NOT NULL,
  `author` varchar(10) NOT NULL,
  `language_code` varchar(3) NOT NULL,
  `date_time` varchar(50) NOT NULL,
  PRIMARY KEY (`service_number`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `servicetype_description`
--

INSERT INTO `servicetype_description` (`service_number`, `service_name`, `author`, `language_code`, `date_time`) VALUES
(1, 'Customer Service', '1', 'eng', ''),
(2, 'Product / Service Satisfaction', '1', 'eng', ''),
(3, 'Security', '1', 'eng', ''),
(4, 'Neatness', '1', 'eng', ''),
(5, 'Class / Quality', '1', 'eng', '');

-- --------------------------------------------------------

--
-- Table structure for table `service_industry`
--

CREATE TABLE IF NOT EXISTS `service_industry` (
  `industry_code` int(11) NOT NULL AUTO_INCREMENT,
  `industry_name` varchar(50) NOT NULL,
  `default_servicestypes` varchar(50) NOT NULL,
  `author` varchar(50) NOT NULL,
  `date_created` varchar(50) NOT NULL,
  PRIMARY KEY (`industry_code`),
  UNIQUE KEY `industry_name` (`industry_name`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `service_industry`
--

INSERT INTO `service_industry` (`industry_code`, `industry_name`, `default_servicestypes`, `author`, `date_created`) VALUES
(1, 'Fast Food', '1,2,3,4,5', '1', ''),
(2, 'Tourism and Travels', '1,2,4,5', '6', '21:05:24'),
(3, 'Restaurant and Bars', '1,2,3,4', '0', ''),
(4, 'Hotels', '1,2,3,4,5', '0', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
