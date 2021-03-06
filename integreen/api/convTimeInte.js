#!/usr/bin/node

/**
 * Converts InTeGreen Unix timestamps into cleartext date.
 *
 * Copyright 2014 Matthias Dieter Wallnöfer, TIS innovation park,
 *                                           Bolzano/Bozen - Italy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

"use strict";

process.stdin.setEncoding('utf8');

var buffer = '';
process.stdin.on('readable', function() {
    var chunk = process.stdin.read();
    if (chunk != null) {
        buffer += chunk;
    }
});
process.stdin.on('end', function() {
    var lines = buffer.split('\n');
    lines.forEach(function(line) {
        try {
            // if valid JSON
            var data = JSON.parse(line);
            if (typeof(data) == 'object') {
                // array
                data.forEach(function(record) {
                    record.timestamp = new Date(record.timestamp).toString();
                });
            } else if (typeof(data) == 'number') {
                // only timestamp
                data = new Date(data).toString();
            }
            process.stdout.write(JSON.stringify(data));
        } catch (e) {
            // if other data
            process.stdout.write(line);
        }
    });
});
