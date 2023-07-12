const { connection } = require('../config/connection');
const { createCard } = require('../utils/createCard');
const { createLayout } = require('../utils/createLayout');
const queryCreator = require('../utils/queryCreator');

const removeOptions = ['created_at', 'updated_at'];

class GlobalService {

  async getCatalog(){

    const dataTable = await connection.query("SELECT * FROM information_schema.tables WHERE table_catalog = 'dialog_db' AND table_schema NOT LIKE 'pg_%' AND table_schema <> 'information_schema' ORDER BY table_name");
    const dataTypes = await connection.query("SELECT t.table_name, c.column_name, c.data_type FROM information_schema.tables t JOIN information_schema.columns c ON t.table_name = c.table_name WHERE t.table_catalog = 'dialog_db' AND t.table_schema NOT LIKE 'pg_%' AND t.table_schema <> 'information_schema' ORDER BY t.table_name");

    const dataTableRows = dataTable.rows;
    const dataTypesRows = dataTypes.rows;

    const newDataTableRows = [...dataTableRows];
    const newDataTypesRows = dataTypesRows.filter((elem) => !removeOptions.some(val => val === elem.column_name));

    const results = this.convertData(newDataTableRows, newDataTypesRows);

    const dialogNames = [];
    const cardDialogNames = [];

    dataTableRows.map((elem) => {
      cardDialogNames.push(`Maintenance_card_${elem.table_name}`);
      dialogNames.push(`Maintenance_dialog${elem.table_name}`);
    });

    this.createFiles(results);

    return {
      cards: [...cardDialogNames],
      dialogs: [...dialogNames],
    };
  }

  convertData(dTables, dTypes) {

    const converted = [];
    const copyTables = [...dTables];
    const copyTypes = [...dTypes];

    for(let i=0; i<dTables.length; i++){
      const sliced = { ...copyTables.splice(0, 1)[0] };
      const filtered = copyTypes.filter((val) => val.table_name === sliced.table_name );
      converted.push({ table_schema: sliced, table_datatypes: filtered });
    }

    return converted;

  }

  async createFiles(data) {

    createCard(data);
    createLayout(data);

  }

  async getUniqueData(config){

    const data = await connection.query(`SELECT * FROM ${config} ORDER BY id`);
    const rows = data.rows;

    return rows;
  }

  async postData(body, tableName) {

    const { query, values } = await queryCreator({ insert: true }, tableName, body);

    const created = await connection.query(query, [...values]);
    const { id } = created;

    return {
      message: 'created successfully',
      id,
    }
  }

  async updateData(id, body, tableName) {

    delete body.id;
    console.log(body);
    const { query, values } = await queryCreator({ update: true }, tableName, body);
    console.log(query);

    await connection.query(query, [id, ...values]);

    return {
      message: 'updated successfully',
      body: {
        id,
        ...body,
      }
    }
  }

  async deleteData(id, tableName) {
    await connection.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);

    return {
      message: 'deleted successfully',
      id,
    }
  }

  async clearAll(tableName){
    await connection.query(`DELETE FROM ${tableName}`);
    return {
      message: 'deleted all successfully',
    }
  }


}

module.exports = GlobalService;
