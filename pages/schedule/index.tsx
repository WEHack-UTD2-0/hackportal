import * as React from 'react';
import { useState, useEffect } from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import { grey, indigo, blue, teal, purple, red, orange } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from '@material-ui/styles';
import classNames from 'clsx';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import { StayCurrentLandscapeTwoTone } from '@material-ui/icons';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';
import Description from '@material-ui/icons/BorderColor';
import firebase from 'firebase';

const resources = [
  {
    fieldName: 'location',
    title: 'Location',
    instances: [
      { id: 'Room 1', text: 'Room 1', color: indigo },
      { id: 'Room 2', text: 'Room 2', color: blue },
      { id: 'Room 3', text: 'Room 3', color: teal },
    ],
  },
  {
    fieldName: 'Event',
    title: 'Type',
    instances: [
      { id: 1, text: 'Event', color: '#BEE9E8' },
      { id: 2, text: 'Sponsor', color: '#62B6CB' },
      // { id: 3, text: 'Tech Talk', color: indigo },
      { id: 4, text: 'Workshop', color: '#CAE9FF' },
      { id: 5, text: 'Social', color: '#BCBCDC' },
    ],
  },
];

const styles = ({ palette }: Theme) =>
  createStyles({
    appointment: {
      borderRadius: 0,
      borderBottom: 0,
    },
    weekEndCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
    weekEndDayScaleCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: 'white-100',
      fontSize: '1.3em',
    },
    content: {
      opacity: 0.8,
    },
    container: {
      width: '100%',
      lineHeight: 1.5,
      height: '100%',
    },
  });

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;
type TimeTableCellProps = MonthView.TimeTableCellProps & WithStyles<typeof styles>;
type DayScaleCellProps = MonthView.DayScaleCellProps & WithStyles<typeof styles>;

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
//const defaultCurrentDate = new Date(2023, 2, 30, 9, 0);
const defaultCurrentDate = new Date();

const DayScaleCell = withStyles(styles)(
  ({ startDate, classes, ...restProps }: DayScaleCellProps) => (
    <MonthView.DayScaleCell
      className={classNames({
        [classes.weekEndDayScaleCell]: isWeekEnd(startDate),
      })}
      startDate={startDate}
      {...restProps}
    />
  ),
);

const TimeTableCell = withStyles(styles)(
  ({ startDate, classes, ...restProps }: TimeTableCellProps) => (
    <MonthView.TimeTableCell
      className={classNames({
        [classes.weekEndCell]: isWeekEnd(startDate),
      })}
      startDate={startDate}
      {...restProps}
    />
  ),
);

// #FOLD_BLOCK
const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(
  ({
    classes,
    data,
    ...restProps
  }: // #FOLD_BLOCK
  AppointmentContentProps) => {
    let Event = 'Event';
    if (data.Event === 2) Event = 'Sponsor';
    if (data.Event === 3) Event = 'Tech Talk';
    if (data.Event === 4) Event = 'Workshop';
    if (data.Event === 5) Event = 'Social';

    return (
      <Appointments.AppointmentContent {...restProps} data={data}>
        <div className={classes.container}>
          <div className={classes.text}>{data.title}</div>
          <div className={classNames(classes.text, classes.content)}>{`Type: ${Event}`}</div>
          <div className={classNames(classes.text, classes.content)}>
            {`Location: ${data.location}`}
          </div>
        </div>
      </Appointments.AppointmentContent>
    );
  },
);

export default function Calendar(props: { scheduleCard: ScheduleEvent[] }) {
  const [eventData, setEventData] = useState({
    title: '',
    speakers: '',
    date: '',
    time: '',
    page: '',
    description: '',
    location: '',
  });

  const Appointment = withStyles(styles)(
    ({ onClick, classes, data, ...restProps }: AppointmentProps) => {
      let appointmentColor;
      let borderColorStyle;
      switch (data.Event) {
        case 1:
          appointmentColor = '#4f473b'; // Event color
          borderColorStyle = '#4f473b';
          break;
        case 2:
          appointmentColor = '#1A441B'; // Sponsor color
          borderColorStyle = '#1A441B';
          break;
        case 3:
          appointmentColor = '#4A3628'; // Replace with your color for Tech Talk
          borderColorStyle = '#4A3628';
          break;
        case 4:
          appointmentColor = '#909634'; // Workshop color
          borderColorStyle = '#909634';
          break;
        case 5:
          appointmentColor = '#693230'; // Social color
          borderColorStyle = '#693230';
          break;
        default:
          appointmentColor = 'lightgreen'; // Default color if event number doesn't match any case
          borderColorStyle = 'lightgreen';
          break;
      }

      const boxShadowStyle = '0 0 7px 3px #000000';

      return (
        <Appointments.Appointment
          {...restProps}
          data={data}
          onClick={() => changeEventData(data)}
          style={{
            backgroundColor: appointmentColor,
            boxShadow: boxShadowStyle,
            borderColor: borderColorStyle,
            borderWidth: '2px',
            borderStyle: 'solid',
          }}
        />
      );
    },
  );

  const [appointmentColor, setAppointmentColor] = useState<string>('');

  const changeEventData = (data) => {
    const startDate = new firebase.firestore.Timestamp(data.startTimestamp._seconds, 0).toDate();
    const endDate = new firebase.firestore.Timestamp(data.endTimestamp._seconds, 0).toDate();
    //first match extracts day abbreviation
    //second match extracts month abbreviation and the number day of the month
    var dayString =
      startDate.toString().match(/^[\w]{3}/)[0] +
      ', ' +
      startDate.toString().match(/^\w+ (\w{3} \d{1,2})/)[1];

    var speakerString = '';
    if (data.speakers !== undefined && data.speakers !== null && data.speakers.length !== 0) {
      if (data.speakers.length == 2) {
        speakerString = `Hosted by ${data.speakers[0]} & ${data.speakers[1]}`;
      } else if (data.speakers.length == 1) {
        speakerString = `Hosted by ${data.speakers[0]}`;
      } else {
        speakerString = 'Hosted by ';
        for (var i = 0; i < data.speakers.length; i++) {
          if (i === data.speakers.length - 1) {
            speakerString += 'and ' + data.speakers[i];
          } else {
            speakerString += data.speakers[i] + ', ';
          }
        }
      }
    }
    var timeString = `${(startDate.getHours() + 24) % 12 || 12}:${
      startDate.getMinutes() < 10 ? '0' : ''
    }${startDate.getMinutes()} ${startDate.getHours() < 12 ? 'AM' : 'PM'} - ${
      (endDate.getHours() + 24) % 12 || 12
    }:${endDate.getMinutes() < 10 ? '0' : ''}${endDate.getMinutes()} ${
      endDate.getHours() < 12 ? 'AM' : 'PM'
    }`;

    // Get the appointment color based on the event type
    switch (data.Event) {
      case 1:
        setAppointmentColor('#4f473b'); // Event color #566427
        break;
      case 2:
        setAppointmentColor('#1A441B'); // Sponsor color
        break;
      case 3:
        setAppointmentColor('#4A3628'); // Tech Talk
        break;
      case 4:
        setAppointmentColor('#909634'); // Workshop color
        break;
      case 5:
        setAppointmentColor('#693230'); // Social color
        break;
      default:
        setAppointmentColor('lightgreen');
        break;
    }

    //setting new event data based on event clicked
    setEventData({
      title: data.title,
      speakers: speakerString,
      date: dayString,
      time: timeString,
      page: data.page,
      description: data.description,
      location: data.location,
    });
  };

  return (
    <>
      <div className="text-4xl font-bold p-3 text-white-100">Schedule</div>
      <div className="flex flex-wrap lg:justify-between p-5 hide-scrollbar text-white-100">
        {/* Calender */}
        <div
          className="overflow-y-auto overflow-x-hidden lg:w-[62%] w-full h-full border-2 border-white-100 rounded-md custom-scrollbar"
          style={{ boxShadow: '0 0 10px 5px #000000' }}
        >
          <Paper style={{ backgroundColor: '#FFE9D7' }}>
            <Scheduler data={props.scheduleCard}>
              <ViewState defaultCurrentDate={defaultCurrentDate} />

              <DayView startDayHour={9} endDayHour={24} intervalCount={1} />

              <Appointments
                appointmentComponent={Appointment}
                appointmentContentComponent={AppointmentContent}
              />
              {/*<Resources data={resources} /> */}

              <Toolbar />
              <DateNavigator />
              <ViewSwitcher />
              <TodayButton />
            </Scheduler>
          </Paper>
        </div>

        {/* Event info card */}
        <div
          className="bg-green-200 overflow-y-auto flex flex-col justify-between lg:w-[36%] w-full h-full lg:my-2 my-2 border-2] rounded-md shadow-lg p-5"
          style={{
            backgroundColor: appointmentColor,
            boxShadow: '0 0 10px 5px #FFE9D7',
            position: 'sticky',
            top: '15vh',
            height: '65vh',
          }}
        >
          <section>
            {eventData.title === '' ? (
              <div className="text-3xl text-white-100 rounded-md p-6">
                Click on an event for more info
              </div>
            ) : (
              <div />
            )}
            <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
            <div className="md:text-lg text-sm mb-4">{eventData.speakers}</div>

            {/* Shows card info if user has clicked on an event */}
            <div className={eventData.title === '' ? 'hidden' : 'inline'}>
              <div className="grid grid-cols-2 gap-y-2 md:my-8 my-6 md:text-lg text-sm">
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
                    Date
                  </p>
                  <p>{eventData.date}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
                    Location
                  </p>
                  <p>{eventData.location}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
                    Time
                  </p>
                  <p>{eventData.time}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
                    Page
                  </p>
                  <p>{eventData.page}</p>
                </div>
              </div>

              <div className="lg:text-base text-sm">
                <p className="flex items-center font-semibold">
                  {<Description style={{ fontSize: 'medium', margin: '2px' }} />}
                  Description
                </p>
                <p>{eventData.description}</p>
              </div>
            </div>
          </section>
          <div className="text-right">*All events are given in CST</div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: scheduleData } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule`,
    {},
  );
  return {
    props: {
      scheduleCard: scheduleData,
    },
  };
};
