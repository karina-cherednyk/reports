import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
// import filterFactory, { numberFilter } from 'react-bootstrap-table2-filter';
import {Component} from 'react';

function mapColumnName(name) {
  const names = { ordinal: "№", surname: "Прізвище", firstName: "Ім`я", 
                  lastName: "По батькові", bookNo: "№_залікової книжки", 
                  termGrade: "За роботу в трим", ectsGrade: "Оцінка ЄКТС",
                  examGrade: "За тезу, залік, екзамен", sum: "Разом", 
                  nationalGrade: "Національна оцінка"
              }
  return names[name]

}
const paginationOptions = {
  sizePerPageList: ([5, 10, 15, 20, 30]).map(x => ({text: x+"", value: x}))
};
class Table extends Component{

  constructor(props){
      super(props);

      let tableData = props.tableData;

      this.state = {
          data: tableData
      };
      this.tableColumns = [];
      this.dataColumns = [];

      if(tableData){
          let columns = Object.keys(tableData[0]).map(c => [c, mapColumnName(c)] ).filter(c => c[1]);
          this.dataColumns = columns.map(c => c[0]);
          this.tableColumns = columns.map(c => ({dataField: c[0], text: c[1], style: this.mapStyle }) );
      }
      
    }


  render() {
  return <BootstrapTable 
          keyField="ordinal"
          data={ this.state.data } 
          columns={ this.tableColumns } 
          condensed={true}
          bordered={ false }
          pagination={ paginationFactory(paginationOptions) }
          />
  }
}

export default Table;