import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onTopicChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query, onRunQuery } = this.props;
    onChange({ ...query, topic: event.target.value });

    onRunQuery();
  };

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { topic } = query;

    return (
      <div className="gf-form">
        <FormField
          labelWidth={10}
          inputWidth={20}
          value={topic || ''}
          onChange={this.onTopicChange}
          label="MQTT Topic"
          tooltip="MQTT Topic to subscribe"
        />
      </div>
    );
  }
}
