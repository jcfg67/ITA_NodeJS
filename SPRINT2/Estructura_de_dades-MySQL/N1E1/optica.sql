-- MySQL Script generated by MySQL Workbench
-- Fri 19 Feb 2021 01:23:36 AM CET
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema OPTICA
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `OPTICA` ;

-- -----------------------------------------------------
-- Schema OPTICA
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `OPTICA` DEFAULT CHARACTER SET utf8mb4 ;
USE `OPTICA` ;

-- -----------------------------------------------------
-- Table `OPTICA`.`suppliers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`suppliers` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`suppliers` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255) NOT NULL,
  `number` VARCHAR(10) NULL,
  `floor` VARCHAR(3) NULL,
  `door` VARCHAR(3) NULL,
  `city` VARCHAR(50) NOT NULL,
  `postal_code` VARCHAR(10) NOT NULL,
  `country` VARCHAR(50) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `fax` VARCHAR(15) NULL,
  `NIF` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`supplier_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OPTICA`.`brands`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`brands` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`brands` (
  `brand_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `supplier_id` INT NOT NULL,
  PRIMARY KEY (`brand_id`),
  INDEX `fk_brands_suppliers1_idx` (`supplier_id` ASC) VISIBLE,
  CONSTRAINT `fk_brands_suppliers`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `OPTICA`.`suppliers` (`supplier_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OPTICA`.`glasses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`glasses` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`glasses` (
  `glass_id` INT NOT NULL AUTO_INCREMENT,
  `brand_id` INT NOT NULL,
  `graduation_right_eye` DECIMAL(4,2) NOT NULL,
  `graduation_left_eye` DECIMAL(4,2) NOT NULL,
  `frame_type` ENUM('rimless', 'plastic', 'metalic') NOT NULL,
  `frame_color` VARCHAR(25) NOT NULL,
  `right_eye_glass_color` VARCHAR(25) NOT NULL,
  `left_eye_glass_color` VARCHAR(25) NOT NULL,
  `price` DECIMAL(5,2) NOT NULL,
  PRIMARY KEY (`glass_id`),
  INDEX `fk_glasses_brands1_idx` (`brand_id` ASC) VISIBLE,
  CONSTRAINT `fk_glasses_brands`
    FOREIGN KEY (`brand_id`)
    REFERENCES `OPTICA`.`brands` (`brand_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OPTICA`.`customers`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`customers` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `registered_at` DATETIME NOT NULL,
  `recommended_by` INT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_customers_customers1_idx` (`recommended_by` ASC) VISIBLE,
  CONSTRAINT `fk_customers_customers`
    FOREIGN KEY (`recommended_by`)
    REFERENCES `OPTICA`.`customers` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OPTICA`.`employees`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`employees` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`employees` (
  `employee_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`employee_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `OPTICA`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `OPTICA`.`orders` ;

CREATE TABLE IF NOT EXISTS `OPTICA`.`orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `glass_id` INT NOT NULL,
  `employee_id` INT NOT NULL,
  PRIMARY KEY (`order_id`),
  INDEX `fk_orders_customers1_idx` (`customer_id` ASC) VISIBLE,
  INDEX `fk_orders_glasses1_idx` (`glass_id` ASC) VISIBLE,
  INDEX `fk_orders_employees1_idx` (`employee_id` ASC) VISIBLE,
  CONSTRAINT `fk_orders_customers`
    FOREIGN KEY (`customer_id`)
    REFERENCES `OPTICA`.`customers` (`customer_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_glasses`
    FOREIGN KEY (`glass_id`)
    REFERENCES `OPTICA`.`glasses` (`glass_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_employees`
    FOREIGN KEY (`employee_id`)
    REFERENCES `OPTICA`.`employees` (`employee_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
