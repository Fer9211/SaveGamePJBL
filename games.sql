-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: games
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `idgame` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `descricao` text NOT NULL,
  `nota` int NOT NULL,
  `url` varchar(100) NOT NULL,
  PRIMARY KEY (`idgame`),
  UNIQUE KEY `idgame_UNIQUE` (`idgame`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'Euro Truck Simulator 2','Ótimo jogo, traz bem a experiência de dirigir um caminhão',5,'/capas/capaEuroTruck.jpg'),(2,'Grand Theft Auto V','Ótimo jogo',5,'/capas/1775267877153.jpg'),(4,'The Witcher 3: Wild Hunt','O jogador controla Geralt de Rivia, um caçador de monstros em busca de sua filha adotiva em um mundo fantástico inspirado na mitologia eslava.',3,'/capas/1775615049515.png'),(6,'Red Dead Redemption 2','Explore vastos céus e terras em busca da Princesa Zelda e lute contra forças do mal em Hyrule. Crie e combine diversos itens e ferramentas poderosas para superar desafios.',5,'/capas/1775692682041.png'),(7,'Cyberpunk 2077','Torne-se V, um mercenário em busca de um implante único que carrega a chave para a imortalidade em Night City, uma megalópole obcecada por poder, glamour e modificações corporais.',5,'/capas/1775693421585.png'),(9,'Forza Horizon 5','Explore as paisagens vibrantes e em constante evolução do México. Pilote centenas dos melhores carros do mundo em uma campanha épica com desafios ilimitados e diversão em alta velocidade.',5,'/capas/1775693559118.jpg'),(10,'God of War Ragnarök','Kratos e Atreus devem viajar pelos Nove Reinos em busca de respostas enquanto as forças asgardianas se preparam para a batalha profetizada que causará o fim do mundo.',4,'/capas/1775693652232.jpg');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `generos`
--

DROP TABLE IF EXISTS `generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `generos` (
  `idgeneros` int NOT NULL AUTO_INCREMENT,
  `nomeGenero` varchar(45) NOT NULL,
  PRIMARY KEY (`idgeneros`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `generos`
--

LOCK TABLES `generos` WRITE;
/*!40000 ALTER TABLE `generos` DISABLE KEYS */;
INSERT INTO `generos` VALUES (1,'Simulação'),(2,'Ação'),(3,'RPG'),(4,'Mundo Aberto'),(5,'asd'),(6,'Aventura'),(7,'RPG de Ação'),(8,'Sci-Fi'),(9,'Corrida'),(10,'Esporte'),(11,'Hack and Slash');
/*!40000 ALTER TABLE `generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogos_generos`
--

DROP TABLE IF EXISTS `jogos_generos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogos_generos` (
  `id_jogos` int NOT NULL,
  `id_generos` int NOT NULL,
  PRIMARY KEY (`id_jogos`,`id_generos`),
  KEY `fk_generos_idx` (`id_generos`),
  CONSTRAINT `fk_generos` FOREIGN KEY (`id_generos`) REFERENCES `generos` (`idgeneros`),
  CONSTRAINT `fk_jogos` FOREIGN KEY (`id_jogos`) REFERENCES `game` (`idgame`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogos_generos`
--

LOCK TABLES `jogos_generos` WRITE;
/*!40000 ALTER TABLE `jogos_generos` DISABLE KEYS */;
INSERT INTO `jogos_generos` VALUES (1,1),(9,1),(2,2),(4,2),(6,2),(10,2),(4,3),(6,3),(1,4),(4,4),(6,4),(7,4),(6,6),(10,6),(7,7),(7,8),(9,9),(9,10),(10,11);
/*!40000 ALTER TABLE `jogos_generos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogos_plataformas`
--

DROP TABLE IF EXISTS `jogos_plataformas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogos_plataformas` (
  `game_id` int NOT NULL,
  `plataformas_id` int NOT NULL,
  PRIMARY KEY (`game_id`,`plataformas_id`),
  KEY `fk_jogos_has_plataformas_plataforma_idx` (`plataformas_id`),
  CONSTRAINT `fk_jogos_has_plataformas_jogo` FOREIGN KEY (`game_id`) REFERENCES `game` (`idgame`),
  CONSTRAINT `fk_jogos_has_plataformas_plataforma` FOREIGN KEY (`plataformas_id`) REFERENCES `plataformas` (`idplataformas`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogos_plataformas`
--

LOCK TABLES `jogos_plataformas` WRITE;
/*!40000 ALTER TABLE `jogos_plataformas` DISABLE KEYS */;
INSERT INTO `jogos_plataformas` VALUES (1,1),(4,1),(6,1),(9,1),(10,1),(2,2),(4,2),(6,2),(7,2),(9,2),(7,8),(10,8);
/*!40000 ALTER TABLE `jogos_plataformas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plataformas`
--

DROP TABLE IF EXISTS `plataformas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plataformas` (
  `idplataformas` int NOT NULL AUTO_INCREMENT,
  `nomePlataforma` varchar(45) NOT NULL,
  PRIMARY KEY (`idplataformas`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataformas`
--

LOCK TABLES `plataformas` WRITE;
/*!40000 ALTER TABLE `plataformas` DISABLE KEYS */;
INSERT INTO `plataformas` VALUES (1,'PC'),(2,'Xbox'),(3,'asd'),(4,'PlayStation 5'),(5,'Xbox Series X/S'),(6,'PlayStation 4'),(7,'Xbox One'),(8,'PlayStation');
/*!40000 ALTER TABLE `plataformas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-08 23:49:40
