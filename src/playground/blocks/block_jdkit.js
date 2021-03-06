'use strict';

Entry.JDKit = {
    Cmd: {
        LED: 1,
        TUNE: 2,
        TUNEDUR: 3,
        ROLL: 4,
        PITCH: 5,
        YAW: 6,
        THROTTLE: 7,
        OPTION: 8,
        MOTOR0: 9,
        MOTOR1: 10,
        MOTOR2: 11,
        MOTOR3: 12,
    },
    Sensor: {
        JOYSTICK_LLR: 1,
        JOYSTICK_LTB: 2,
        JOYSTICK_RLR: 3,
        JOYSTICK_RTB: 4,
        BUTTON: 5,
        DRONECONNECT: 6,
        ULTRASONIC: 7,
        GYRO_X: 8,
        GYRO_Y: 9,
        DRONEREADY: 10,
    },
    setZero: function() {
        Entry.hw.sendQueue.CMD = [
            0xf0,
            0x00,
            0x00,
            0x00,
            0x64,
            0x64,
            0x64,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
            0x00,
        ];
        Entry.hw.update();
    },
    name: 'JDKit',
    url: 'http://www.junilab.co.kr',
    imageName: 'jdkit.png',
    title: {
        "en": "JDKit",
        "ko": "제이디키트"
    },
    monitorTemplate: {
        imgPath: 'hw/coconut.png',
        width: 256,
        height: 256,
        listPorts: {
            'CMD[1]': {
                name: Lang.Blocks.coconut_sensor_temperature,
                type: 'input',
                pos: {
                    x: 0,
                    y: 0,
                },
            },
            accelerationX: {
                name: Lang.Blocks.coconut_sensor_acceleration_x,
                type: 'input',
                pos: {
                    x: 0,
                    y: 0,
                },
            },
            accelerationY: {
                name: Lang.Blocks.coconut_sensor_acceleration_y,
                type: 'input',
                pos: {
                    x: 0,
                    y: 0,
                },
            },
            accelerationZ: {
                name: Lang.Blocks.coconut_sensor_acceleration_z,
                type: 'input',
                pos: {
                    x: 0,
                    y: 0,
                },
            },
        },
        ports: {
            leftProximityValue: {
                name: Lang.Blocks.coconut_sensor_left_proximity,
                type: 'input',
                pos: {
                    x: 122,
                    y: 156,
                },
            },
            rightProximityValue: {
                name: Lang.Blocks.coconut_sensor_right_proximity,
                type: 'input',
                pos: {
                    x: 10,
                    y: 108,
                },
            },
            leftFloorValue: {
                name: Lang.Blocks.coconut_sensor_left_floor,
                type: 'input',
                pos: {
                    x: 100,
                    y: 234,
                },
            },
            rightFloorValue: {
                name: Lang.Blocks.coconut_sensor_right_floor,
                type: 'input',
                pos: {
                    x: 13,
                    y: 180,
                },
            },
            light: {
                name: Lang.Blocks.coconut_sensor_light,
                type: 'input',
                pos: {
                    x: 56,
                    y: 189,
                },
            },
        },
        mode: 'both',
    },
};

Entry.JDKit.getBlocks = function() {
    return {
        //region JDKit
        jdkit_joystick: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_joystick_lefttopbottom, 1],
                        [Lang.Blocks.jdkit_joystick_leftleftright, 2],
                        [Lang.Blocks.jdkit_joystick_righttopbottom, 3],
                        [Lang.Blocks.jdkit_joystick_rightleftright, 4],
                    ],
                    value: 1,
                    fontSize: 11,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_joystick',
            },
            paramsKeyMap: {
                JOYSTICK: 0,
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                var joystick = script.getField('JOYSTICK');

                if (joystick == 1)
                    return sensorData[Entry.JDKit.Sensor.JOYSTICK_LTB];
                else if (joystick == 2)
                    return 100 - sensorData[Entry.JDKit.Sensor.JOYSTICK_LLR];
                else if (joystick == 3)
                    return sensorData[Entry.JDKit.Sensor.JOYSTICK_RTB] - 100;
                else return 100 - sensorData[Entry.JDKit.Sensor.JOYSTICK_RLR];
            },
            syntax: { js: [], py: [] },
        },
        jdkit_button: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        ['1', 0],
                        ['2', 1],
                        ['3', 2],
                        ['4', 3],
                        ['5', 4],
                        ['6', 5],
                        ['7', 6],
                        ['8', 7],
                    ],
                    value: 0,
                    fontSize: 11,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_button',
            },
            paramsKeyMap: {
                BUTTON: 0,
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                var button = script.getField('BUTTON');
                return sensorData[Entry.JDKit.Sensor.BUTTON] & (0x01 << button)
                    ? 0
                    : 1;
            },
            syntax: { js: [], py: [] },
        },
        jdkit_gyro: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_gyro_frontrear, 1],
                        [Lang.Blocks.jdkit_gyro_leftright, 2],
                    ],
                    value: 1,
                    fontSize: 11,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_gyro',
            },
            paramsKeyMap: {
                GYRO: 0,
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                var gyro = script.getField('GYRO');
                var gyro_x = sensorData[Entry.JDKit.Sensor.GYRO_X];
                var gyro_y = sensorData[Entry.JDKit.Sensor.GYRO_Y];
                if (gyro == 1)
                    return gyro_y > 127 ? (gyro_y ^ 0xff) + 1 : -1 * gyro_y;
                else return gyro_x > 127 ? (gyro_x ^ 0xff) + 1 : -1 * gyro_x;
            },
            syntax: { js: [], py: [] },
        },
        jdkit_ultrasonic: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_ultrasonic',
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                return sensorData[Entry.JDKit.Sensor.ULTRASONIC];
            },
            syntax: { js: [], py: [] },
        },
        jdkit_connect: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_connect',
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                return sensorData[Entry.JDKit.Sensor.DRONECONNECT];
            },
            syntax: { js: [], py: [] },
        },
        jdkit_ready: {
            color: '#00979D',
            fontColor: '#fff',
            skeleton: 'basic_string_field',
            statements: [],
            params: [],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_ready',
            },
            class: 'JDKit_Sensor',
            isNotFor: ['JDKit'],
            func: function(sprite, script) {
                var sensorData = Entry.hw.portData.CMD;
                return sensorData[Entry.JDKit.Sensor.DRONEREADY];
            },
            syntax: { js: [], py: [] },
        },

        jdkit_led: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_led_color_green, 1],
                        [Lang.Blocks.jdkit_led_color_orange, 2],
                    ],
                    value: 1,
                    fontSize: 11,
                },
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_led_turnon, 3],
                        [Lang.Blocks.jdkit_led_turnoff, 4],
                    ],
                    value: 3,
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_led',
            },
            paramsKeyMap: {
                COLOR: 0,
                ACTION: 1,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var color = script.getField('COLOR', script);
                var act = script.getField('ACTION', script);
                if (color == 1)
                    cmd[Entry.JDKit.Cmd.LED] =
                        act == 3 ? cmd[1] | 0x01 : cmd[1] & 0x02;
                else
                    cmd[Entry.JDKit.Cmd.LED] =
                        act == 3 ? cmd[1] | 0x02 : cmd[1] & 0x01;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        jdkit_tune: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_tune_do, 1],
                        [Lang.Blocks.jdkit_tune_re, 2],
                        [Lang.Blocks.jdkit_tune_mi, 3],
                        [Lang.Blocks.jdkit_tune_fa, 4],
                        [Lang.Blocks.jdkit_tune_sol, 5],
                        [Lang.Blocks.jdkit_tune_la, 6],
                        [Lang.Blocks.jdkit_tune_si, 7],
                    ],
                    value: 1,
                    fontSize: 11,
                },
                {
                    type: 'Dropdown',
                    options: [
                        ['0.2', 2],
                        ['0.4', 4],
                        ['0.6', 6],
                        ['0.8', 8],
                        ['1', 10],
                        ['2', 20],
                        ['3', 30],
                        ['4', 40],
                        ['5', 50],
                    ],
                    value: 10,
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_tune',
            },
            paramsKeyMap: {
                NOTE: 0,
                DURATION: 1,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;

                var note = script.getField('NOTE', script);
                var duration = script.getField('DURATION', script);
                var noteCount = Entry.hw.sendQueue.noteCount;
                Entry.hw.sendQueue.noteCount =
                    typeof noteCount == 'undefined' ? 1 : noteCount + 1;
                cmd[Entry.JDKit.Cmd.TUNE] = note;
                cmd[Entry.JDKit.Cmd.TUNEDUR] = duration;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },

        jdkit_motor: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_motor_lefttop, 1],
                        [Lang.Blocks.jdkit_motor_leftbottom, 0],
                        [Lang.Blocks.jdkit_motor_righttop, 2],
                        [Lang.Blocks.jdkit_motor_rightbottom, 3],
                    ],
                    value: 1,
                    fontSize: 11,
                },
                {
                    type: 'Block',
                    accept: 'string',
                    value: '15',
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_motor',
            },
            paramsKeyMap: {
                MOTOR: 0,
                POWER: 1,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var motor = script.getField('MOTOR', script);
                var power = script.getNumberValue('POWER', script);

                cmd[Entry.JDKit.Cmd.MOTOR0 + motor] =
                    power > 100 ? 100 : power < 0 ? 0 : power;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },

        jdkit_throttle: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    value: '0',
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_throttle',
            },
            paramsKeyMap: {
                THROTTLE: 0,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var throttle = script.getNumberValue('THROTTLE', script);

                cmd[Entry.JDKit.Cmd.THROTTLE] =
                    throttle > 200 ? 200 : throttle < 0 ? 0 : throttle;
                cmd[Entry.JDKit.Cmd.OPTION] = 0x01;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        jdkit_altitude: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    value: '0',
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_altitude',
            },
            paramsKeyMap: {
                ALTITUDE: 0,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var alt = script.getNumberValue('ALTITUDE', script);

                cmd[Entry.JDKit.Cmd.THROTTLE] =
                    alt > 200 ? 200 : alt < 0 ? 0 : alt;
                cmd[Entry.JDKit.Cmd.OPTION] = 0x05;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        jdkit_rollpitch: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Dropdown',
                    options: [
                        [Lang.Blocks.jdkit_gyro_frontrear, 1],
                        [Lang.Blocks.jdkit_gyro_leftright, 2],
                    ],
                    value: 1,
                    fontSize: 11,
                },
                {
                    type: 'Block',
                    accept: 'string',
                    value: '0',
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_rollpitch',
            },
            paramsKeyMap: {
                DIR: 0,
                POWER: 1,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var dir = script.getField('DIR', script);
                var power = script.getNumberValue('POWER', script);
                if (dir == 1)
                    cmd[Entry.JDKit.Cmd.PITCH] =
                        power > 100 ? 200 : power < -100 ? 0 : power + 100;
                else
                    cmd[Entry.JDKit.Cmd.ROLL] =
                        power > 100 ? 200 : power < -100 ? 0 : power + 100;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        jdkit_yaw: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Block',
                    accept: 'string',
                    value: '0',
                    fontSize: 11,
                },
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_yaw',
            },
            paramsKeyMap: {
                YAW: 0,
            },
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;
                var yaw = script.getNumberValue('YAW', script);

                cmd[Entry.JDKit.Cmd.YAW] =
                    yaw > 25 ? 101 : yaw < -25 ? 99 : 100;
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        jdkit_emergency: {
            color: '#00979D',
            skeleton: 'basic',
            statements: [],
            params: [
                {
                    type: 'Indicator',
                    img: 'block_icon/hardware_03.png',
                    size: 12,
                },
            ],
            events: {},
            def: {
                params: [null],
                type: 'jdkit_emergency',
            },
            paramsKeyMap: {},
            class: 'JDKit_Command',
            isNotFor: ['JDKit'],

            func: function(sprite, script) {
                if (typeof Entry.hw.sendQueue.CMD == 'undefined')
                    Entry.hw.sendQueue.CMD = [
                        0xf0,
                        0,
                        0,
                        0,
                        100,
                        100,
                        100,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                    ];
                var cmd = Entry.hw.sendQueue.CMD;

                cmd[Entry.JDKit.Cmd.OPTION] = 0x81;
                Entry.hw.update();
                return script.callReturn();
            },
            syntax: { js: [], py: [] },
        },
        //endregion JDKit
    };
};
