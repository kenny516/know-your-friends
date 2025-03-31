export interface GamePlayerInitialInfo {
    id: number;
    game_player_id: number;
    initial_info: string;
    created_at: string;
    updated_at: string;
}

export interface GameQuestion {
    id: number;
    game_id: number;
    question: string;
    order: number;
    showen: boolean;
    created_at: string;
    updated_at: string;
}

export interface GameQuestionAnswer {
    id: number;
    game_question_id: number;
    game_player_id: number;
    answer: string;
    created_at: string;
    updated_at: string;
}

export interface Game {
    id: number;
    creator_player_id: number;
    created_at: string;
    updated_at: string;
}

export interface GamePlayer {
    id: number;
    game_id: number;
    player_id: number;
    created_at: string;
    updated_at: string;
}

export interface GamePlayerRequest {
    id: number;
    sender_player_id: number;
    receiver_player_id: number;
    status: 'pending' | 'accepted' | 'rejected';
    acceptance_timestamp: string | null;
    created_at: string;
    updated_at: string;
}

export interface Player {
    id: number;
    user_id: number;
    x: number;
    y: number;
    z: number;
    created_at: string;
    updated_at: string;
}

export interface FriendRequest {
    id: number;
    sender_user_id: number;
    receiver_user_id: number;
    status: 'pending' | 'accepted' | 'rejected';
    acceptance_timestamp: string | null;
    created_at: string;
    updated_at: string;
}

export interface FriendConnection {
    id: number;
    sender_user_id: number;
    receiver_user_id: number;
    connection_value: number;
    created_at: string;
    updated_at: string;
}