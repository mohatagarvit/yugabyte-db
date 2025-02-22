// Copyright (c) YugaByte, Inc.

import { connect } from 'react-redux';
import { RestoreBackup } from '../';
import { restoreTableBackup, restoreTableBackupResponse } from '../../../actions/tables';
import { isNonEmptyArray, isNonEmptyObject } from '../../../utils/ObjectUtils';
import { getPromiseState } from '../../../utils/PromiseUtils';

const mapDispatchToProps = (dispatch) => {
  return {
    restoreTableBackup: (universeUUID, payload) => {
      return dispatch(restoreTableBackup(universeUUID, payload)).then((response) => {
        dispatch(restoreTableBackupResponse(response.payload));
        return response.payload;
      });
    }
  };
};

function mapStateToProps(state, ownProps) {
  const initialFormValues = {
    restoreToUniverseUUID: '',
    restoreToKeyspace: '',
    restoreToTableName: '',
    storageConfigUUID: '',
    storageLocation: '',
    restoreTimeStamp: '',
    parallelism: 8,
    kmsConfigUUID: ''
  };
  const {
    customer: { configs },
    universe: { currentUniverse, universeList },
    cloud,
    featureFlags,
  } = state;
  const storageConfigs = configs.data.filter((config) => config.type === 'STORAGE');

  if (isNonEmptyObject(ownProps.backupInfo)) {
    const {
      backupInfo: {
        backupList,
        storageConfigUUID,
        storageLocation,
        universeUUID,
        keyspace,
        tableName,
        tableNameList,
        tableUUIDList,
        transactionalBackup
      }
    } = ownProps;

    /* AC: Careful! This sets the default of the Select but the return value
     * is a string while the other options, when selected, return an object
     * with the format { label: <display>, value: <internal> }
     */
    initialFormValues.restoreToTableName = tableName;
    initialFormValues.restoreToUniverseUUID = { value: universeUUID, label: currentUniverse.data.name };
    initialFormValues.restoreTableNameList = tableNameList;
    initialFormValues.restoreTableUUIDList = tableUUIDList;
    initialFormValues.restoreToKeyspace = keyspace;
    initialFormValues.storageConfigUUID = storageConfigUUID;
    initialFormValues.storageLocation = storageLocation;
    initialFormValues.transactionalBackup = transactionalBackup;
    initialFormValues.backupList = backupList;
  } else {
    if (getPromiseState(currentUniverse).isSuccess() && isNonEmptyObject(currentUniverse.data)) {
      initialFormValues.restoreToUniverseUUID = { value: currentUniverse.data.universeUUID, label: currentUniverse.data.name };
    }
    if (isNonEmptyArray(storageConfigs)) {
      initialFormValues.storageConfigUUID = {
        value: storageConfigs[0].configUUID,
        label: storageConfigs[0].configName
      };
    }
  }

  return {
    storageConfigs: storageConfigs,
    currentUniverse: currentUniverse,
    universeList: universeList,
    initialValues: initialFormValues,
    cloud: cloud,
    featureFlags: featureFlags,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestoreBackup);
