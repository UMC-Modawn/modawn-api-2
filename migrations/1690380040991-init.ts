import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1690380040991 implements MigrationInterface {
  name = 'Init1690380040991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`discussion_like\` (\`userIdx\` int NOT NULL, \`discussionIdx\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userIdx\`, \`discussionIdx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`opinion_like\` (\`userIdx\` int NOT NULL, \`opinionIdx\` int NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`userIdx\`, \`opinionIdx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`opinion_reply\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`type\` enum ('APPROVE', 'DISAPPROVE', 'OTHER') NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`writerIdx\` int NULL, \`opinionIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`opinion\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`type\` enum ('APPROVE', 'DISAPPROVE', 'OTHER') NOT NULL, \`assert\` varchar(100) NOT NULL, \`reason\` varchar(100) NOT NULL, \`content\` text NOT NULL, \`url\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`writerIdx\` int NULL, \`discussionIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(50) NOT NULL, \`name\` varchar(20) NOT NULL, \`nickname\` varchar(50) NOT NULL, \`encryptedPassword\` varchar(64) NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), UNIQUE INDEX \`IDX_e2364281027b926b879fa2fa1e\` (\`nickname\`), PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discussion\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(50) NOT NULL, \`content\` text NOT NULL, \`status\` enum ('DISCUSS', 'CLOSE') NOT NULL, \`url\` varchar(255) NOT NULL, \`imgUrl\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`createdDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modifiedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`writerIdx\` int NULL, \`discussionCategoryIdx\` int NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discussion_category\` (\`idx\` int NOT NULL AUTO_INCREMENT, \`type\` varchar(20) NOT NULL, PRIMARY KEY (\`idx\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussion_like\` ADD CONSTRAINT \`FK_805ecacff22782d04fe95a2580e\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussion_like\` ADD CONSTRAINT \`FK_3f97a9c5f15dce24395018ce6ff\` FOREIGN KEY (\`discussionIdx\`) REFERENCES \`discussion\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion_like\` ADD CONSTRAINT \`FK_8e8b8acc636fbfdb6c950b50a80\` FOREIGN KEY (\`userIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion_like\` ADD CONSTRAINT \`FK_ab2462eec546017c0be714e196c\` FOREIGN KEY (\`opinionIdx\`) REFERENCES \`opinion\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion_reply\` ADD CONSTRAINT \`FK_1804b0bffd9e0f211bd1c7837e3\` FOREIGN KEY (\`writerIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion_reply\` ADD CONSTRAINT \`FK_e157f9ec02fecb2f9826a3d3002\` FOREIGN KEY (\`opinionIdx\`) REFERENCES \`opinion\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion\` ADD CONSTRAINT \`FK_e30c884fe9a989338a76f1bfcab\` FOREIGN KEY (\`writerIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`opinion\` ADD CONSTRAINT \`FK_3e35d1394170bab20033de90a2f\` FOREIGN KEY (\`discussionIdx\`) REFERENCES \`discussion\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussion\` ADD CONSTRAINT \`FK_b844fc6fe806734570323e242e7\` FOREIGN KEY (\`writerIdx\`) REFERENCES \`user\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discussion\` ADD CONSTRAINT \`FK_7b461a47531e27a13b7cb579d44\` FOREIGN KEY (\`discussionCategoryIdx\`) REFERENCES \`discussion_category\`(\`idx\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`discussion\` DROP FOREIGN KEY \`FK_7b461a47531e27a13b7cb579d44\``);
    await queryRunner.query(`ALTER TABLE \`discussion\` DROP FOREIGN KEY \`FK_b844fc6fe806734570323e242e7\``);
    await queryRunner.query(`ALTER TABLE \`opinion\` DROP FOREIGN KEY \`FK_3e35d1394170bab20033de90a2f\``);
    await queryRunner.query(`ALTER TABLE \`opinion\` DROP FOREIGN KEY \`FK_e30c884fe9a989338a76f1bfcab\``);
    await queryRunner.query(`ALTER TABLE \`opinion_reply\` DROP FOREIGN KEY \`FK_e157f9ec02fecb2f9826a3d3002\``);
    await queryRunner.query(`ALTER TABLE \`opinion_reply\` DROP FOREIGN KEY \`FK_1804b0bffd9e0f211bd1c7837e3\``);
    await queryRunner.query(`ALTER TABLE \`opinion_like\` DROP FOREIGN KEY \`FK_ab2462eec546017c0be714e196c\``);
    await queryRunner.query(`ALTER TABLE \`opinion_like\` DROP FOREIGN KEY \`FK_8e8b8acc636fbfdb6c950b50a80\``);
    await queryRunner.query(`ALTER TABLE \`discussion_like\` DROP FOREIGN KEY \`FK_3f97a9c5f15dce24395018ce6ff\``);
    await queryRunner.query(`ALTER TABLE \`discussion_like\` DROP FOREIGN KEY \`FK_805ecacff22782d04fe95a2580e\``);
    await queryRunner.query(`DROP TABLE \`discussion_category\``);
    await queryRunner.query(`DROP TABLE \`discussion\``);
    await queryRunner.query(`DROP INDEX \`IDX_e2364281027b926b879fa2fa1e\` ON \`user\``);
    await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`opinion\``);
    await queryRunner.query(`DROP TABLE \`opinion_reply\``);
    await queryRunner.query(`DROP TABLE \`opinion_like\``);
    await queryRunner.query(`DROP TABLE \`discussion_like\``);
  }
}
