import { KeyboardControls } from '@react-three/drei'
import React from 'react'
import { Avatar, AvatarType } from './element/avatar-3d'
import Controller from 'ecctrl'

const keyboardMap = [
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
    { name: 'run', keys: ['Shift'] },
]


export default function Player() {
    return (
        <KeyboardControls map={keyboardMap}>
            <Controller maxVelLimit={5}>
                <Avatar type={AvatarType.DEFAULT} />
            </Controller>
        </KeyboardControls>
    )
}
