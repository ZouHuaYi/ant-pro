/**
 * Created by zhy on 2019/3/22.
 */
import React from 'react';

import { Select } from 'antd';

const Option = Select.Option;
const provinceData = ['Zhejiang', 'Jiangsu'];
const cityData = {
  Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
  Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
};

class Test extends React.Component {
  state = {
    cities: cityData[provinceData[0]],
    secondCity: cityData[provinceData[0]][0],
  }

  handleProvinceChange = (value) => {
    this.setState({
      cities: cityData[value],
      secondCity: cityData[value][0],
    });
  }

  onSecondCityChange = (value) => {
    this.setState({
      secondCity: value,
    });
  }

  render() {
    const { cities } = this.state;
    return (
      <div>
        <Select
          defaultValue={provinceData[0]}
          style={{ width: 120 }}
          onChange={this.handleProvinceChange}
        >
          {provinceData.map(province => <Option key={province}>{province}</Option>)}
        </Select>
        <Select
          style={{ width: 120 }}

          onChange={this.onSecondCityChange}
        >
          {cities.map(city => <Option key={city}>{city}</Option>)}
        </Select>
      </div>
    );
  }
}

export default Test;
