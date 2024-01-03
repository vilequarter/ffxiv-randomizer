"use client";

import { useState } from 'react'
import { IndeterminateCheckbox } from './indeterminateCheckbox';
import { JobSection } from './jobSection';


export default function Home(){
  const jobs = [
    {
      id: 0,
      name: 'Paladin',
      role: 0,
    },
    {
      id: 1,
      name: 'Warrior',
      role: 0,
    },
    {
      id: 2,
      name: 'Dark Knight',
      role: 0,
    },
    {
      id: 3,
      name: 'Gunbreaker',
      role: 0,
    },
    {
      id: 4,
      name: 'White Mage',
      role: 1,
    },
    {
      id: 5,
      name: 'Scholar',
      role: 1,
    },
    {
      id: 6,
      name: 'Astrologian',
      role: 1,
    },
    {
      id: 7,
      name: 'Sage',
      role: 1,
    },
    {
      id: 8,
      name: 'Monk',
      role: 2,
      subtype: 'melee'
    },
    {
      id: 9,
      name: 'Dragoon',
      role: 2,
      subtype: 'melee'
    },
    {
      id: 10,
      name: 'Ninja',
      role: 2,
      subtype: 'melee'
    },
    {
      id: 11,
      name: 'Samurai',
      role: 2,
      subtype: 'melee'
    },
    {
      id: 12,
      name: 'Reaper',
      role: 2,
      subtype: 'melee'
    },
    {
      id: 13,
      name: 'Bard',
      role: 2,
      subtype: 'ranged'
    },
    {
      id: 14,
      name: 'Machinist',
      role: 2,
      subtype: 'ranged'
    },
    {
      id: 15,
      name: 'Dancer',
      role: 2,
      subtype: 'ranged'
    },
    {
      id: 16,
      name: 'Black Mage',
      role: 2,
      subtype: 'magical'
    },
    {
      id: 17,
      name: 'Summoner',
      role: 2,
      subtype: 'magical'
    },
    {
      id: 18,
      name: 'Red Mage',
      role: 2,
      subtype: 'magical'
    }
  ];

  const roles = [
    {
      id: 0,
      name: "Tank",
      indexes: [0, 1, 2, 3]
    },
    {
      id: 1,
      name: "Healer",
      indexes: [4, 5, 6, 7]
    },
    {
      id: 2,
      name: "DPS",
      indexes: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    }
  ]

  const [checkedState, setCheckedState] = useState(
    new Array(jobs.length).fill(true)
  );

  const [roleCheckedState, setRoleCheckedState] = useState(
    new Array(roles.length).fill(1)
  );

  const [chosen, setChosen] = useState(null);

  const handleOnChange = (position) => {
    var i;
    const updatedCheckedState = checkedState.map((item, index) => {
      if(index === position){
        i = index;
        return !item;
      } else {
        return item;
      }
    });

    setCheckedState(updatedCheckedState);
    setChosen(null);
    updateRole(i, updatedCheckedState);
  }

  const handleRoleOnChange = (position) => {
    const updatedCheckedState = roleCheckedState.map((item, index) => {
      if(index === position){
        if(item === 0){
          updateJobs(index, 1);
          return 1;
        } else {
          updateJobs(index, 0);
          return 0;
        }
      } else return item;
    })

    setRoleCheckedState(updatedCheckedState);
    setChosen(null);
  }

  const updateJobs = (role, state) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      if(jobs[index].role === role){
        return state;
      } else return item;
    })

    setCheckedState(updatedCheckedState);
  }

  const updateRole = (index, updatedCheckedState) => {
    var role = jobs[index].role;
    var total = roles[role].indexes.length;
    var checked = 0;
    var newState;
    for(var i = 0; i < updatedCheckedState.length; i++){
      if(jobs[i].role == role && updatedCheckedState[i]){
        checked++;
      }
    }
    if(checked == total){
      newState = 1;
    }else if(checked == 0){
      newState = 0;
    }else{
      newState = 2;
    }

    const updatedRoleState = roleCheckedState.map((item, i) => {
      return(i === role ? newState : item)
    })
    setRoleCheckedState(updatedRoleState);
  }

  const randomize = () => {
    var num = 0;
    for(var i = 0; i < checkedState.length; i++){
      if(checkedState[i]) num++;
    }
    if(num == 0) return;
    var selection = Math.floor(Math.random() * 19);
    while(!checkedState[selection]){
      selection = Math.floor(Math.random() * 19);
    };
    setChosen(selection);
  }

  return(
    <main>
      <h4>Roles</h4>
      <ul>
        {roles.map(({name}, index) => {
          return(
            <li key={index}>

              <IndeterminateCheckbox
                value={roleCheckedState[index]}
                index={index}
                name={name}
                handler={handleRoleOnChange}         
              />

            </li>
          )
        })}
      </ul>
      <hr/><hr/><hr/>
      <h4>Tanks</h4>
      <JobSection
        jobs={jobs.filter((job) => job.role === 0)}
        checkedState={checkedState}
        handler={handleOnChange}
        chosen={chosen}
      />

      <hr/>
      <h4>Healers</h4>
      <JobSection
        jobs={jobs.filter((job) => job.role === 1)}
        checkedState={checkedState}
        handler={handleOnChange}
        chosen={chosen}
      />

      <hr/>
      <h4>DPS</h4>
      <JobSection
        jobs={jobs.filter((job) => job.role === 2)}
        checkedState={checkedState}
        handler={handleOnChange}
        chosen={chosen}
      />

      <hr/>
      <br/>
      <br/>
      <button onClick={randomize}>
        Get a Job
      </button>
      <br/>
      <button onClick={() => setChosen(null)}>
        Clear
      </button>
    </main>
  )
}