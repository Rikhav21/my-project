CREATE TABLE `gifts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`recipient` text NOT NULL,
	`gift` text NOT NULL,
	`received` integer DEFAULT 0 NOT NULL,
	`created_at` integer NOT NULL
);
