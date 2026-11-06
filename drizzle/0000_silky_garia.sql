CREATE TABLE `admins` (
	`slot` integer PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `navigations` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`date` text,
	`time` text,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`image` text,
	`capacity` integer,
	`status` text NOT NULL,
	`demo` integer DEFAULT 0 NOT NULL,
	`createdAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `participations` (
	`id` text PRIMARY KEY NOT NULL,
	`navigationId` text NOT NULL,
	`firstName` text NOT NULL,
	`lastName` text NOT NULL,
	`phone` text NOT NULL,
	`partySize` integer NOT NULL,
	`message` text NOT NULL,
	`createdAt` text NOT NULL,
	FOREIGN KEY (`navigationId`) REFERENCES `navigations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `participation_nav` ON `participations` (`navigationId`);--> statement-breakpoint
CREATE UNIQUE INDEX `participation_phone` ON `participations` (`navigationId`,`phone`);