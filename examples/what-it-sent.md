# what discord sent (redacted)

## header on every request: X-Super-Properties (decoded)

```json
{
  "os": "Mac OS X",
  "browser": "Discord Client",
  "release_channel": "stable",
  "client_version": "0.0.416",
  "os_version": "25.1.0",
  "os_arch": "arm64",
  "app_arch": "arm64",
  "system_locale": "en-US",
  "has_client_mods": false,
  "client_launch_id": "<client_launch_id>",
  "browser_user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.416 Chrome/148.0.7778.280 Electron/42.11.11 Safari/537.36",
  "browser_version": "42.11.11",
  "os_sdk_version": "25",
  "client_build_number": 640102,
  "native_build_number": 94186,
  "client_event_source": null,
  "launch_signature": "<launch_signature>",
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "client_app_state": "focused"
}
```

## requests

| time | request | events inside |
| --- | --- | --- |
| 15:16:38 | POST /api/v9/science | libdiscore_loaded, app_native_crash, desktop_tti, desktop_tti, desktop_tti, desktop_tti, desktop_tti, client_heartbeat, desktop_tti, gateway_connected, dismissible_content_shown_before_connection_open, friends_list_viewed, experiment_user_evaluation_exposed, ready_payload_received, game_name_match_fallback, game_name_match_fallback, game_name_match_fallback, game_name_match_fallback, game_name_match_fallback, dm_list_viewed, experiment_user_evaluation_exposed, friends_list_viewed, desktop_tti, desktop_tti, app_web_perf_startup_metrics, dismissible_content_shown, desktop_tti, desktop_tti |
| 15:16:38 | POST /api/v9/science | app_ui_viewed |
| 15:16:38 | POST /api/v9/science | desktop_tti_v2 |
| 15:16:39 | POST /api/v9/science | notification_permission_status, network_action_detectable_applications_fetch, network_action_detectable_non_games_fetch |
| 15:16:39 | POST /api/v9/science | dismissible_content_shown |
| 15:21:39 | POST /api/v9/science | desktop_perf_heartbeat |

## every event, every field

### 15:16:38 — `libdiscore_loaded` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196488,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 1,
  "success": true,
  "experimental_features": [],
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `app_native_crash` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196501,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 2,
  "electron_crash_reporter_did_crash": false,
  "minidump_exception_type": null,
  "minidump_exception_module_name": null,
  "minidump_relative_crash_address": null,
  "minidump_exception_module_version": null,
  "minidump_exception_module_code_id": null,
  "minidump_exception_thread_name": null,
  "minidump_exception_stacktrace": null,
  "minidump_code_integrity_bytes_different": null,
  "minidump_code_integrity_bytes_compared": null,
  "minidump_code_integrity_flags": null,
  "minidump_code_integrity_reloc_bytes_different": null,
  "minidump_code_integrity_nearest_difference_from_instruction_pointer": null,
  "did_crash": false,
  "renderer_crash_reason": null,
  "renderer_crash_exit_code": null,
  "child_process_crash_type": null,
  "child_process_crash_reason": null,
  "child_process_crash_exit_code": null,
  "had_rtc_connection": false,
  "was_sending_video": false,
  "was_sending_stream": false,
  "was_receiving_video": false,
  "was_receiving_stream": false,
  "video_media_session_id": null,
  "stream_media_session_id": null,
  "intentional_crash_reason": null,
  "last_memory_usage_kb": null,
  "last_used_js_heap_size_kb": null,
  "last_memory_usage_uptime": null,
  "highest_memory_usage_kb": null,
  "highest_used_js_heap_size_kb": null,
  "highest_memory_usage_uptime": null,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196786,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 3,
  "desktop_tti_type": "mainapp_init",
  "process_uptime_ms": 71,
  "duration_ms": null,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196786,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 4,
  "desktop_tti_type": "splash_created",
  "process_uptime_ms": 460,
  "duration_ms": null,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196786,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 5,
  "desktop_tti_type": "mainwin_created",
  "process_uptime_ms": 749,
  "duration_ms": null,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196786,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 6,
  "desktop_tti_type": "mainwin_loadstart",
  "process_uptime_ms": 1003,
  "duration_ms": 254,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196787,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 7,
  "desktop_tti_type": "mainwin_loadcomplete",
  "process_uptime_ms": 3402,
  "duration_ms": 2653,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "unfocused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `client_heartbeat` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196788,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 8,
  "client_heartbeat_initialization_timestamp": 1792177500594,
  "client_heartbeat_version": 31,
  "client_heartbeat_renderer_memory": 278928,
  "client_heartbeat_renderer_memory_used_heap": 91091,
  "electron_process_memory_private": [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ],
  "electron_process_memory_private_and_shared": [
    -1,
    216080,
    376192,
    76400,
    -1,
    110096,
    -1
  ],
  "is_idle": false,
  "idle_duration_ms": 1792178196788,
  "is_afk": false,
  "is_system_suspended": false,
  "is_system_locked": false,
  "client_performance_cpu": 0,
  "client_performance_memory": 778768,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 0,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178196934,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 9,
  "desktop_tti_type": "splash_duration",
  "process_uptime_ms": 3506,
  "duration_ms": 3046,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 256,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `gateway_connected` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197132,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 10,
  "num_failed_connect_attempts": 0,
  "gateway_url": "wss://gateway.discord.gg",
  "is_reconnect": false,
  "is_fast_connect": true,
  "duration_ms_since_first_connect_attempt": 1,
  "duration_ms_since_connect_attempt_start": 1,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `dismissible_content_shown_before_connection_open` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197132,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 11,
  "content_type": "FOR_LATER_POPOUT_COACHMARK",
  "group_name": null,
  "latest_version": null,
  "guild_id": null,
  "snowflake_id": null,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `friends_list_viewed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197132,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 12,
  "tab_opened": "ADD_FRIEND",
  "num_friends": 0,
  "num_friends_online": 0,
  "num_friends_idle": 0,
  "num_friends_dnd": 0,
  "num_outgoing_requests": 0,
  "num_incoming_requests": 0,
  "num_game_friends": 0,
  "num_game_outgoing_requests": 0,
  "num_game_incoming_requests": 0,
  "now_playing_visible": false,
  "now_playing_num_cards": 0,
  "now_playing_games_detected": [],
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `experiment_user_evaluation_exposed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 13,
  "evaluation_id": "<evaluation_id>",
  "exposure_location": "app open",
  "unit_type": "user",
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `ready_payload_received` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 14,
  "compressed_byte_size": 204169,
  "uncompressed_byte_size": 1929630,
  "compression_algorithm": "zstd-stream",
  "packing_algorithm": "etf",
  "unpack_duration_ms": 55,
  "identify_total_server_duration_ms": 346,
  "identify_api_duration_ms": 305,
  "identify_guilds_duration_ms": 25,
  "num_guilds": 33,
  "num_guild_channels": 1806,
  "num_guild_category_channels": 243,
  "presences_size": 2,
  "users_size": 64164,
  "read_states_size": 60391,
  "private_channels_size": 19181,
  "user_settings_size": 4346,
  "experiments_size": 10543,
  "user_guild_settings_size": 93939,
  "relationships_size": 3897,
  "remaining_data_size": 10400,
  "guild_channels_size": 1084672,
  "guild_members_size": 8921,
  "guild_presences_size": 2,
  "guild_roles_size": 295645,
  "guild_emojis_size": 156205,
  "guild_threads_size": 100,
  "guild_stickers_size": 42238,
  "guild_events_size": 3398,
  "guild_features_size": 10498,
  "guild_remaining_data_size": 1700856,
  "size_metrics_duration_ms": 16,
  "duration_ms_since_identify_start": -1792178194224.7,
  "duration_ms_since_connection_start": -1792178194223.7,
  "duration_ms_since_emit_start": 1792178194461.7,
  "is_reconnect": false,
  "is_fast_connect": true,
  "did_force_clear_guild_hashes": false,
  "identify_uncompressed_byte_size": 0,
  "identify_compressed_byte_size": 0,
  "had_cache_at_startup": false,
  "used_cache_at_startup": false,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `game_name_match_fallback` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 15,
  "matched_name": "<game/app>",
  "matched_game_id": "<id>",
  "exe_name": "",
  "had_exe_path": true,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `game_name_match_fallback` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 16,
  "matched_name": "<game/app>",
  "matched_game_id": "<id>",
  "exe_name": "",
  "had_exe_path": true,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `game_name_match_fallback` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 17,
  "matched_name": "<game/app>",
  "matched_game_id": "<id>",
  "exe_name": "",
  "had_exe_path": true,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `game_name_match_fallback` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 18,
  "matched_name": "<game/app>",
  "matched_game_id": "<id>",
  "exe_name": "",
  "had_exe_path": true,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `game_name_match_fallback` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 19,
  "matched_name": "<game/app>",
  "matched_game_id": "<id>",
  "exe_name": "",
  "had_exe_path": true,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 1,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `dm_list_viewed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 20,
  "num_users_visible": 75,
  "num_users_visible_with_mobile_indicator": 0,
  "now_playing_visible": true,
  "now_playing_num_cards": 0,
  "now_playing_games_detected": [],
  "visible_user_ids": "[74 × <id>]",
  "changelog_dm_visible": false,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `experiment_user_evaluation_exposed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 21,
  "evaluation_id": "<evaluation_id>",
  "exposure_location": "dm/gdm list rendered",
  "unit_type": "user",
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `friends_list_viewed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197385,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 22,
  "tab_opened": "ONLINE",
  "num_friends": 21,
  "num_friends_online": 0,
  "num_friends_idle": 0,
  "num_friends_dnd": 4,
  "num_outgoing_requests": 2,
  "num_incoming_requests": 0,
  "num_game_friends": 0,
  "num_game_outgoing_requests": 0,
  "num_game_incoming_requests": 0,
  "now_playing_visible": true,
  "now_playing_num_cards": 0,
  "now_playing_games_detected": [],
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197496,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 23,
  "desktop_tti_type": "mainwin_loadjsappcomplete",
  "process_uptime_ms": 3985,
  "duration_ms": 3236,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197566,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 24,
  "desktop_tti_type": "full_tti_complete",
  "process_uptime_ms": 3985,
  "duration_ms": null,
  "client_performance_cpu": 4.165648086581333,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `app_web_perf_startup_metrics` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178197937,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 25,
  "load_id": "<load_id>",
  "metric_name": "tti",
  "url_root_path": "channels/@me",
  "ready_packing_algorithm": "etf",
  "ready_unpack_duration_ms": 55,
  "was_authenticated": true,
  "time_first_render_after_ready_end": 2308,
  "script_cost_loaf_supported": true,
  "script_cost_unattributed_eval_ms": 0,
  "script_cost_total_count": 272,
  "script_cost_reported_count": 20,
  "script_cost_url": [
    "/assets/dc3357bf5dd2c083.js",
    "/assets/556707.bb1a25f3c212ce8f.js",
    "/assets/web.c5b338cc7e610833.js",
    "/assets/df0dea530c19c07e.js",
    "/assets/9eb8b2cddd1f7221.js",
    "/assets/fc1351436cae3d10.js",
    "/assets/9f3a7f4cae44df09.js",
    "/assets/feae0568a479d769.js",
    "/assets/32152286b5401b10.js",
    "/assets/2448aba90fca4bef.js",
    "/assets/2a8c4fc7f286e86d.js",
    "/assets/c5b35d471f84f265.js",
    "/assets/304c93c2bcf81272.js",
    "/assets/452563528a14bda5.js",
    "/assets/97809205e6364f58.js",
    "/assets/79fb8c83d95a0f2b.js",
    "/assets/41b23cac54368a4a.js",
    "/assets/846f84fbc422d895.js",
    "/assets/85139ecb2ad32f0b.js",
    "/assets/4a15864b6d15470b.js"
  ],
  "script_cost_download_ms": [
    318,
    0,
    448,
    387,
    353,
    351,
    351,
    351,
    351,
    350,
    350,
    350,
    350,
    350,
    350,
    350,
    350,
    350,
    350,
    350
  ],
  "script_cost_transfer_size_bytes": [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "script_cost_from_cache": [
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ],
  "script_cost_initial_eval_ms": [
    429,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "script_cost_total_eval_ms": [
    429,
    689,
    11,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  "script_cost_eval_attributed": [
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ],
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 1,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `dismissible_content_shown` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178198033,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 26,
  "type": "<blob>",
  "unselected_content_types": [],
  "content_count": 0,
  "fatigable_content_count": 0,
  "bypass_fatigue": false,
  "guild_id": null,
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 2,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178198077,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 27,
  "desktop_tti_type": "<blob>",
  "process_uptime_ms": 4324,
  "duration_ms": 3575,
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 2,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `desktop_tti` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178198077,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 28,
  "desktop_tti_type": "full_interactive_tti_complete",
  "process_uptime_ms": 4324,
  "duration_ms": null,
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 2,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198101
}
```

### 15:16:38 — `app_ui_viewed` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178198105,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 29,
  "total_compressed_byte_size": 4818583,
  "total_uncompressed_byte_size": 16831149,
  "total_transfer_byte_size": 0,
  "js_compressed_byte_size": 614081,
  "js_uncompressed_byte_size": 1823659,
  "js_transfer_byte_size": 0,
  "css_compressed_byte_size": 214651,
  "css_uncompressed_byte_size": 1234556,
  "css_transfer_byte_size": 0,
  "load_id": "<load_id>",
  "screen_name": "friends",
  "duration_ms_since_app_opened": 1970,
  "app_hardware_acceleration_enabled": true,
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 2,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198114
}
```

### 15:16:38 — `desktop_tti_v2` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178198172,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 30,
  "full_tti_duration_ms": 4324,
  "main_init_time_ms": 71,
  "main_appready_time_ms": 360,
  "splash_window_created_time_ms": 460,
  "splash_window_shown_time_ms": 834,
  "splash_window_shown_duration_ms": 2672,
  "splash_update_check_duration_ms": 343,
  "main_window_created_time_ms": 749,
  "main_window_shown_time_ms": 3402,
  "main_window_hidden_duration_ms": 2653,
  "main_window_document_load_time_ms": 2384,
  "main_window_webapp_load_duration_ms": 583,
  "main_window_webapp_interactive_duration_ms": 922,
  "main_window_webapp_bundle_name": "web.c5b338cc7e610833.js",
  "main_window_webapp_bundle_ttfb_ms": 307,
  "main_window_webapp_bundle_download_decompress_duration_ms": 141,
  "main_window_webapp_bundle_compressed_size_bytes": 3305918,
  "main_window_webapp_bundle_uncompressed_size_bytes": 12410287,
  "main_window_webapp_bundle_transfer_size_bytes": 0,
  "main_window_webapp_bundle_compile_foreground_duration_us": 11,
  "main_window_webapp_bundle_compile_background_duration_us": 167316,
  "main_window_webapp_bundle_compile_streamed": true,
  "connection_rtt_ms": 50,
  "connection_downlink_kbps": 1650,
  "main_window_navigation_start_time_ms": 1004,
  "main_window_first_paint_time_ms": 3188,
  "main_window_first_contentful_paint_time_ms": 4220,
  "had_update": false,
  "had_restart": false,
  "start_inactive": false,
  "start_minimized": false,
  "was_authenticated": true,
  "uptime_os": 2314053,
  "http_cache_size_bytes": 716637696,
  "shared_dictionary_size_bytes": 12410287,
  "client_performance_cpu": 24.595260540983784,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 2,
  "uptime_process_renderer": 2,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178198366
}
```

### 15:16:39 — `notification_permission_status` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178199252,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 31,
  "os_enabled": false,
  "client_performance_cpu": 41.5690212655087,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 3,
  "uptime_process_renderer": 3,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178199309
}
```

### 15:16:39 — `network_action_detectable_applications_fetch` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178199308,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 32,
  "status_code": 304,
  "url": "https://cdn.discordapp.com/detectables/games-v1.json",
  "request_method": "get",
  "sent_etag": "W/\"<blob>\"",
  "received_etag": "\"<blob>\"",
  "client_performance_cpu": 41.5690212655087,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 3,
  "uptime_process_renderer": 4,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178199309
}
```

### 15:16:39 — `network_action_detectable_non_games_fetch` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178199309,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 33,
  "status_code": 200,
  "url": "https://cdn.discordapp.com/detectables/non-games-v1.json",
  "request_method": "get",
  "sent_etag": "W/\"<blob>\"",
  "received_etag": "W/\"<blob>\"",
  "client_performance_cpu": 41.5690212655087,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 3,
  "uptime_process_renderer": 4,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178199309
}
```

### 15:16:39 — `dismissible_content_shown` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178199382,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 34,
  "type": "<blob>",
  "unselected_content_types": null,
  "content_count": 1,
  "fatigable_content_count": 1,
  "bypass_fatigue": true,
  "guild_id": null,
  "version": 100,
  "client_performance_cpu": 41.5690212655087,
  "client_performance_memory": 681504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 3,
  "uptime_process_renderer": 4,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178199794
}
```

### 15:21:39 — `desktop_perf_heartbeat` → /api/v9/science

```json
{
  "client_track_timestamp": 1792178499246,
  "client_heartbeat_session_id": "<client_heartbeat_session_id>",
  "event_sequence_number": 35,
  "electron_process_memory_private": [
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1
  ],
  "electron_process_memory_private_and_shared": [
    -1,
    150080,
    334176,
    80368,
    -1,
    140880,
    -1
  ],
  "electron_process_type_count": [
    0,
    1,
    1,
    1,
    0,
    3,
    0
  ],
  "v8_heap_stats": [
    115264,
    9008,
    115264,
    4091862,
    102537,
    4194304,
    2068,
    20315
  ],
  "blink_memory_stats": [
    30665,
    45518
  ],
  "gpu_dedicated_memory": [],
  "gpu_renderer_used_memory": [],
  "client_performance_cpu": 0.35434670696546755,
  "client_performance_memory": 705504,
  "cpu_core_count": 10,
  "accessibility_features": 524544,
  "rendered_locale": "en-US",
  "uptime_app": 303,
  "uptime_process_renderer": 303,
  "launch_signature": "<launch_signature>",
  "client_rtc_state": "DISCONNECTED",
  "client_app_state": "focused",
  "client_viewport_width": 1470,
  "client_viewport_height": 874,
  "client_uuid": "<client_uuid>",
  "client_send_timestamp": 1792178499246
}
```

