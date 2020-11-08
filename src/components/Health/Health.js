import React, { useState } from 'react';
import { Chart, Line, Point, Tooltip, Axis } from 'bizcharts';

import modules from './Health.module.scss';
import Logo from '../../assets/images/logo.svg';
import Button from '../Button/Button';
import ChangingProgressProvider from './ChangingProgressProvider';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const randomDataGen = (length, temp = false) => {
	const data = [];
	const date = new Date();
	let value;
	for (var i = 0; i < length; i++) {
		const newDate = new Date(date.getTime() - i * 86400000);
		if (temp) {
			value = 34 + Math.random() * (39 - 34);
		} else {
			value = Math.random() * 100;
		}
		console.log(newDate);
		data.push({
			date: `${newDate.getDate()}.${newDate.getMonth() + 1}`,
			value: value,
		});
	}

	return data.reverse();
};

const randomDataYearGen = (temp = false) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const data = [];
	const date = new Date();
	let value;
	for (var i = 0; i < 12; i++) {
		const newDate = new Date(date.getTime() + i * 86400000);
		if (temp) {
			value = 34 + Math.random() * (39 - 34);
		} else {
			value = Math.random() * 100;
		}
		console.log(newDate);
		data.push({
			date: `${months[(newDate.getMonth() - i) % 12]}`,
			value: value,
		});
	}

	return data.reverse();
};

function Health() {
	const padding = [20, 20, 45, 30];
	const width = '70vw';
	const height = '60vh';

	const overallDataWeek = randomDataGen(7);
	const overallDataMonth = randomDataGen(30);
	const overallDataYear = randomDataYearGen();
	console.log(overallDataYear);

	const tempDataWeek = randomDataGen(7, true);
	const tempDataMonth = randomDataGen(30, true);
	const tempDataYear = randomDataYearGen(true);

	const mentalDataWeek = randomDataGen(7);
	const mentalDataMonth = randomDataGen(30);
	const mentalDataYear = randomDataYearGen();

	const physicDataWeek = randomDataGen(7);
	const physicDataMonth = randomDataGen(30);
	const physicDataYear = randomDataYearGen();

	// console.log(randomDataWeek);
	// const randomDataMonth = randomDataGen(30)
	// const randomDataMonth = [];

	const [overall, setOverall] = useState(overallDataWeek);
	const [temp, setTemp] = useState(tempDataWeek);
	const [mental, setMental] = useState(mentalDataWeek);
	const [physic, setPhysic] = useState(physicDataWeek);

	const [buttonsOverall, setButtonsOverall] = useState({
		week: true,
		month: false,
		year: false,
	});
	const [buttonsTemp, setButtonsTemp] = useState({
		week: true,
		month: false,
		year: false,
	});
	const [buttonsMental, setButtonsMental] = useState({
		week: true,
		month: false,
		year: false,
	});
	const [buttonsPhysic, setButtonsPhysic] = useState({
		week: true,
		month: false,
		year: false,
	});

	const title = {
		style: {
			fontSize: '15',
			textAlign: 'center',
			fill: 'white',
			marginTop: '20px',
		},
	};

	const circularStyle = buildStyles({
		pathColor: '#FF5151',
		textColor: '#FF5151',
		textSize: '20px',
	});

	// OVERALL DATA HANDLERS

	const toWeekOverall = () => {
		if (!buttonsOverall['week']) {
			setButtonsOverall({ week: true, month: false, year: false });
			setOverall(overallDataWeek);
		}
		return;
	};

	const toMonthOverall = () => {
		if (!buttonsOverall['month']) {
			setButtonsOverall({ week: false, month: true, year: false });
			setOverall(overallDataMonth);
		}
		return;
	};
	const toYearOverall = () => {
		if (!buttonsOverall['year']) {
			setButtonsOverall({ week: false, month: false, year: true });
			setOverall(overallDataYear);
		}
		return;
	};

	// TEMP DATA HANDLERS

	const toWeekTemp = () => {
		if (!buttonsTemp['week']) {
			setButtonsTemp({ week: true, month: false, year: false });
			setTemp(tempDataWeek);
		}
		return;
	};

	const toMonthTemp = () => {
		if (!buttonsTemp['month']) {
			setButtonsTemp({ week: false, month: true, year: false });
			setTemp(tempDataMonth);
		}
		return;
	};
	const toYearTemp = () => {
		if (!buttonsTemp['year']) {
			setButtonsTemp({ week: false, month: false, year: true });
			setTemp(tempDataYear);
		}
		return;
	};

	// MENTAL DATA HANDLERS

	const toWeekMental = () => {
		if (!buttonsMental['week']) {
			setButtonsMental({ week: true, month: false, year: false });
			setMental(mentalDataWeek);
		}
		return;
	};

	const toMonthMental = () => {
		if (!buttonsMental['month']) {
			setButtonsMental({ week: false, month: true, year: false });
			setMental(mentalDataMonth);
		}
		return;
	};
	const toYearMental = () => {
		if (!buttonsMental['year']) {
			setButtonsMental({ week: false, month: false, year: true });
			setMental(mentalDataYear);
		}
		return;
	};

	// PHYSIC DATA HANDLERS

	const toWeekPhysic = () => {
		if (!buttonsPhysic['week']) {
			setButtonsPhysic({ week: true, month: false, year: false });
			setPhysic(physicDataWeek);
		}
		return;
	};

	const toMonthPhysic = () => {
		if (!buttonsPhysic['month']) {
			setButtonsPhysic({ week: false, month: true, year: false });
			setPhysic(physicDataMonth);
		}
		return;
	};
	const toYearPhysic = () => {
		if (!buttonsPhysic['year']) {
			setButtonsPhysic({ week: false, month: false, year: true });
			setPhysic(physicDataYear);
		}
		return;
	};

	return (
		<div className={modules.container}>
			{/* <div className={modules.header}>
                            
            </div> */}
            <img src={Logo} alt=""/>
            <p className={modules.title}>Health Monitoring</p>

			<div className={modules.progressBars}>
				<div>
                    <ChangingProgressProvider
                    					values={[0, overall.slice(-1)[0]['value'].toFixed(2)]}
                    				>
                    					{(percentage) => (
                    						<CircularProgressbar
                    							value={percentage}
                    							text={`${percentage}%`}
                    							styles={circularStyle}
                    						/>
                    					)}
                    				</ChangingProgressProvider>
                                    <p>Overall</p>
                </div>
                <div>
                    <ChangingProgressProvider
    					values={[0, temp.slice(-1)[0]['value'].toFixed(2)]}
    				>
    					{(percentage) => (
    						<CircularProgressbar
                            value={percentage}
                            text={`${percentage}°C`}
                            minValue={34}
                            maxValue={39}
                            styles={circularStyle}
                        />
    					)}
    				</ChangingProgressProvider>
                    <p>Temperature</p>
                </div>
                <div>
                    <ChangingProgressProvider
    					values={[0, mental.slice(-1)[0]['value'].toFixed(2)]}
    				>
    					{(percentage) => (
    						<CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={circularStyle}
                        />
    					)}
    				</ChangingProgressProvider>
                    <p>Mental</p>
                </div>
                <div>
                    <ChangingProgressProvider
    					values={[0, physic.slice(-1)[0]['value'].toFixed(2)]}
    				>
    					{(percentage) => (
    						<CircularProgressbar
                            value={percentage}
                            text={`${percentage}%`}
                            styles={circularStyle}
                        />
    					)}
    				</ChangingProgressProvider>
                    <p>Physical</p>
                </div>
			</div>

			<div className={modules.container_chart}>
				<div className={modules.chartTitle}>
					<span>Overall</span>
					<span>{`${overall.slice(-1)[0]['value'].toFixed(2)}`}</span>
				</div>
                <p className={modules.description}>General health condition percentage based on values of temperature, mental state and physical condition</p>

				<Chart
					padding={padding}
					autoFit
					width={width}
					height={height}
					data={overall}
					scale={{ value: { min: 0, max: 100 } }}
					onLineMouseleave={console.log}
				>
					<Line position='date*value' style={{ stroke: '#FF5151' }} />
					<Point position='date*value' />
					<Tooltip showCrosshairs lock triggerOn='click' />
					<Axis name='value' title={title} />
				</Chart>
				<p className={modules.dateLabel}>date</p>
				<div className={modules.buttons}>
					<Button onClick={toWeekOverall} active={buttonsOverall['week']}>
						Week
					</Button>
					<Button onClick={toMonthOverall} active={buttonsOverall['month']}>
						Month
					</Button>
					<Button onClick={toYearOverall} active={buttonsOverall['year']}>
						Year
					</Button>
				</div>
			</div>

			<div className={modules.container_chart}>
				<div className={modules.chartTitle}>
					<span>Body temperature</span>
					<span>{`${temp.slice(-1)[0]['value'].toFixed(2)}`}</span>
				</div>
                <p className={modules.description}>Body temperature values provided by special equipment</p>

				<Chart
					padding={padding}
					autoFit
					width={width}
					height={height}
					data={temp}
					scale={{ value: { min: 34, max: 39 } }}
					onLineMouseleave={console.log}
				>
					<Line position='date*value' style={{ stroke: '#FF5151' }} />
					<Point position='date*value' />
					<Tooltip showCrosshairs lock triggerOn='click' />
					<Axis name='value' title={title} />
				</Chart>
				<p className={modules.dateLabel}>date</p>
				<div className={modules.buttons}>
					<Button onClick={toWeekTemp} active={buttonsTemp['week']}>
						Week
					</Button>
					<Button onClick={toMonthTemp} active={buttonsTemp['month']}>
						Month
					</Button>
					<Button onClick={toYearTemp} active={buttonsTemp['year']}>
						Year
					</Button>
				</div>
			</div>

			<div className={modules.container_chart}>
				<div className={modules.chartTitle}>
					<span>Mental state</span>
					<span>{`${mental.slice(-1)[0]['value'].toFixed(2)}`}</span>
				</div>
                <p className={modules.description}>Mental state values based on answers from daily frame of mind form</p>

				<Chart
					padding={padding}
					autoFit
					width={width}
					height={height}
					data={mental}
					scale={{ value: { min: 0, max: 100 } }}
					onLineMouseleave={console.log}
				>
					<Line position='date*value' style={{ stroke: '#FF5151' }} />
					<Point position='date*value' />
					<Tooltip showCrosshairs lock triggerOn='click' />
					<Axis name='value' title={title} />
				</Chart>
				<p className={modules.dateLabel}>date</p>
				<div className={modules.buttons}>
					<Button onClick={toWeekMental} active={buttonsMental['week']}>
						Week
					</Button>
					<Button onClick={toMonthMental} active={buttonsMental['month']}>
						Month
					</Button>
					<Button onClick={toYearMental} active={buttonsMental['year']}>
						Year
					</Button>
				</div>
			</div>

			<div className={modules.container_chart}>
				<div className={modules.chartTitle}>
					<span>Physical condition</span>
					<span>{`${physic.slice(-1)[0]['value'].toFixed(2)}`}</span>
				</div>
                <p className={modules.description}>Physical condition values based on data provided by special equipment</p>

				<Chart
					padding={padding}
					autoFit
					width={width}
					height={height}
					data={physic}
					scale={{ value: { min: 0, max: 100 } }}
					onLineMouseleave={console.log}
				>
					{/* {console.log(Object.keys(physic)[0])} */}
					<Line position='date*value' style={{ stroke: '#FF5151' }} />
					<Point position='date*value' />
					<Tooltip showCrosshairs lock triggerOn='click' />
					<Axis name='value' title={title} />
				</Chart>
				<p className={modules.dateLabel}>date</p>
				<div className={modules.buttons}>
					<Button onClick={toWeekPhysic} active={buttonsPhysic['week']}>
						Week
					</Button>
					<Button onClick={toMonthPhysic} active={buttonsPhysic['month']}>
						Month
					</Button>
					<Button onClick={toYearPhysic} active={buttonsPhysic['year']}>
						Year
					</Button>
				</div>
			</div>
		</div>
		// <div className={modules.container}></div>
	);
}

export default Health;
