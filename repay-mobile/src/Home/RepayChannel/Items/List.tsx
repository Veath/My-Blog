import React from 'react';
import {ListProps} from './types';
import ShowListItem from './ShowListItem'


export default ({list, handleCheck}:ListProps) => (
    <>
        {Array.isArray(list) &&
        list.map((d) => (
            <ShowListItem
                checked={d.checked}
                key={d.key}
                index={d.key}
                handleCheck={handleCheck}
                icon={d.icon}
                value={d.value}
            />
        ))
        }
    </>
)
