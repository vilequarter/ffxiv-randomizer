import styles from './page.module.css'

export function JobSection({jobs, checkedState, handler, chosen}){
    console.log(jobs);
    return(
        <ul>
            {jobs.map(({name}, index) => {
                return(
                    <>
                        <li key={jobs[index].id}>
                            <div className={jobs[index].id == chosen ? styles.chosen : ''} style={{width: "20%"}}>
                            <input
                                type="checkbox"
                                id={`job-checkbox-${name}`}
                                name={name}
                                value={name}
                                checked={checkedState[jobs[index].id]}
                                onChange={() => handler(jobs[index].id)}
                            />
                            <label htmlFor={`job-checkbox-${name}`}>{name}</label>
                            </div>
                        </li>
                    </>
                )
            })}
        </ul>
    )
}