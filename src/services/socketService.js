import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { API_BASE_URL } from '../config/host-config';
import { publicIp } from "../config/host-config";

// WebRTC 관련 설정
export const createPeerConnection = (remoteVideoRef) => {
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            {
                urls: `turn:${publicIp}:3478`,
                username: '1696114800',
                credential: 'generated-credential'
            }
        ],
    });

    peerConnection.ontrack = ({ streams: [stream] }) => {
        remoteVideoRef.current.srcObject = stream;
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socketService.sendIceCandidate(event.candidate);
        }
    };

    return peerConnection;
};

// 화면 공유 스트림 생성
export const getScreenShareStream = async () => {
    try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStream.getVideoTracks()[0].onended = () => {
            console.log("Screen sharing stopped");
        };
        return screenStream;
    } catch (error) {
        console.error("Error getting screen share stream", error);
    }
};

// STOMP 소켓 서비스 클래스
class SocketService {
    constructor() {
        this.stompClient = null;
    }

    connect(callback) {
        const socket = new SockJS(`${API_BASE_URL}/ws`);
        this.stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => {
                console.log('STOMP: ' + str);
            }
        });

        this.stompClient.onConnect = (frame) => {
            console.log('Connected: ' + frame);
            this.connected = true;
            callback();
        };

        this.stompClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };

        this.stompClient.activate();
    }

    sendIceCandidate(candidate) {
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.publish({
                destination: '/app/ice-candidate',
                body: JSON.stringify(candidate),
            });
        } else {
            console.log("STOMP Client is not connected");
        }
    }
}

const socketService = new SocketService();
export default socketService;