import { useState } from 'react';
import styles from './App.module.css';
import leftarrow from './assets/leftarrow.png';
import powered from './assets/powered.png'
import { levels, calculateIMC, level } from './helpers/imc';
import { GridItem } from './components/griditem';

const App = () => {

  const [heightField, setheightField] = useState<number>(0);
  const [weightField, setweightField] = useState<number>(0);
  const [toShow, settoShow] = useState<level | null>(null);

  const handleCalculateButton= () =>{

      if(heightField && weightField) {
        settoShow(calculateIMC(heightField, weightField));
      } else {
        alert('Favor preencher os dois campos para calcular o IMC')
      }

  }

  const handleReturn = () => {

    settoShow(null);
    setheightField(0);
    setweightField(0);

  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powered} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>O IMC é uma medida internacional usada para calcular se uma pessoa está no peso ideal.</p>
          <input 
            type="number"
            placeholder='Digite a sua altura Ex: 1.70 (em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setheightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <br />
          <input 
            type="number"
            placeholder='Digite o seu peso Ex: 75.6 (em kilos)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setweightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <br />
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.levelBig}>
              <div className={styles.arrowReturn} onClick={handleReturn}>
                <img src={leftarrow} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}


export default App