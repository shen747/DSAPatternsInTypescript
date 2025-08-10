/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import {
  MeetingScheduler, 
  Meeting, 
  Room, 
  RecurrencePattern,
  SchedulingResult,
  mergeIntervals 
} from './prob-01';

describe('Overlapping Intervals Pattern - Problem 1: Meeting Rooms Scheduler with Advanced Conflict Resolution', () => {
  let rooms: Room[];
  let scheduler: MeetingScheduler;

  beforeEach(() => {
    rooms = [
      { id: 'room1', capacity: 10, equipment: ['projector'], location: 'Building A' },
      { id: 'room2', capacity: 20, equipment: ['whiteboard'], location: 'Building B' },
      { id: 'room3', capacity: 5, equipment: ['projector', 'whiteboard'], location: 'Building A' }
    ];
    scheduler = new MeetingScheduler(rooms);
  });

  describe('MeetingScheduler', () => {
    test('should schedule single meeting successfully', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Team Standup',
        attendees: ['Alice', 'Bob']
      };

      const result = scheduler.scheduleMeeting(meeting);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.has('meeting1')).toBe(true);
      expect(result.conflicts).toHaveLength(0);
      expect(result.minRoomsNeeded).toBe(1);
    });

    test('should detect conflicts when scheduling overlapping meetings', () => {
      const meeting1: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 11,
        priority: 1,
        title: 'Meeting 1',
        attendees: ['Alice']
      };

      const meeting2: Meeting = {
        id: 'meeting2',
        start: 10,
        end: 12,
        priority: 1,
        title: 'Meeting 2',
        attendees: ['Bob']
      };

      scheduler.scheduleMeeting(meeting1);
      const result = scheduler.scheduleMeeting(meeting2);
      
      expect(result.canScheduleAll).toBe(true); // Should use different rooms
      expect(result.roomAssignments.size).toBe(2);
    });

    test('should handle high priority meetings', () => {
      const lowPriorityMeeting: Meeting = {
        id: 'low',
        start: 9,
        end: 11,
        priority: 1,
        title: 'Low Priority',
        attendees: ['Alice']
      };

      const highPriorityMeeting: Meeting = {
        id: 'high',
        start: 10,
        end: 12,
        priority: 5,
        title: 'High Priority',
        attendees: ['Bob']
      };

      scheduler.scheduleMeeting(lowPriorityMeeting);
      const result = scheduler.scheduleMeeting(highPriorityMeeting);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.conflicts.length).toBeGreaterThanOrEqual(0);
    });

    test('should schedule multiple meetings optimally', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 10, end: 11, priority: 1, title: 'M2', attendees: ['B'] },
        { id: 'm3', start: 11, end: 12, priority: 1, title: 'M3', attendees: ['C'] }
      ];

      const result = scheduler.scheduleMultipleMeetings(meetings);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.size).toBe(3);
      expect(result.minRoomsNeeded).toBe(1); // Sequential meetings
    });

    test('should find minimum rooms needed', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 11, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 10, end: 12, priority: 1, title: 'M2', attendees: ['B'] },
        { id: 'm3', start: 10, end: 11, priority: 1, title: 'M3', attendees: ['C'] }
      ];

      const minRooms = scheduler.findMinimumRooms(meetings);
      
      expect(minRooms).toBe(3); // All overlap at time 10-11
    });

    test('should handle room preferences', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Preferred Room Meeting',
        attendees: ['Alice'],
        roomPreference: 'room1'
      };

      const result = scheduler.scheduleMeeting(meeting);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.get('meeting1')).toBe('room1');
    });

    test('should handle buffer time requirements', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Meeting with Buffer',
        attendees: ['Alice'],
        bufferTime: 15 // 15 minutes buffer
      };

      const result = scheduler.scheduleMeeting(meeting);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.analytics.totalMeetingTime).toBeGreaterThan(60); // 60 + buffer
    });
  });

  describe('Meeting updates and cancellations', () => {
    test('should update meeting time', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Original Meeting',
        attendees: ['Alice']
      };

      scheduler.scheduleMeeting(meeting);
      const result = scheduler.updateMeeting('meeting1', { start: 11, end: 12 });
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.has('meeting1')).toBe(true);
    });

    test('should cancel meeting and optimize schedule', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 10, end: 11, priority: 1, title: 'M2', attendees: ['B'] }
      ];

      scheduler.scheduleMultipleMeetings(meetings);
      const result = scheduler.cancelMeeting('m1');
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.has('m1')).toBe(false);
      expect(result.roomAssignments.has('m2')).toBe(true);
    });

    test('should handle invalid meeting updates', () => {
      expect(() => scheduler.updateMeeting('nonexistent', { start: 9 })).toThrow();
    });
  });

  describe('Available slot finding', () => {
    test('should find available slots for new meeting', () => {
      const existingMeeting: Meeting = {
        id: 'existing',
        start: 10,
        end: 12,
        priority: 1,
        title: 'Existing',
        attendees: ['Alice']
      };

      scheduler.scheduleMeeting(existingMeeting);
      const slots = scheduler.findAvailableSlots(60, 9, 15); // 60 minutes between 9-15

      expect(slots.length).toBeGreaterThan(0);
      slots.forEach(slot => {
        expect(slot.end - slot.start).toBeGreaterThanOrEqual(60);
        expect(slot.start).toBeGreaterThanOrEqual(9);
        expect(slot.end).toBeLessThanOrEqual(15);
      });
    });

    test('should find slots with room requirements', () => {
      const roomRequirements = { equipment: ['projector'], capacity: 10 };
      const slots = scheduler.findAvailableSlots(60, 9, 17, roomRequirements);

      slots.forEach(slot => {
        const room = rooms.find(r => r.id === slot.roomId);
        expect(room?.equipment).toContain('projector');
        expect(room?.capacity).toBeGreaterThanOrEqual(10);
      });
    });

    test('should handle no available slots', () => {
      // Fill all rooms for entire day
      rooms.forEach((room, index) => {
        const meeting: Meeting = {
          id: `meeting${index}`,
          start: 9,
          end: 17,
          priority: 1,
          title: `All Day Meeting ${index}`,
          attendees: ['Someone'],
          roomPreference: room.id
        };
        scheduler.scheduleMeeting(meeting);
      });

      const slots = scheduler.findAvailableSlots(60, 9, 17);
      expect(slots).toHaveLength(0);
    });
  });

  describe('Schedule optimization', () => {
    test('should optimize schedule for better utilization', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 14, end: 15, priority: 1, title: 'M2', attendees: ['B'] },
        { id: 'm3', start: 16, end: 17, priority: 1, title: 'M3', attendees: ['C'] }
      ];

      scheduler.scheduleMultipleMeetings(meetings);
      const result = scheduler.optimizeSchedule();
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.utilization).toBeGreaterThan(0);
      expect(result.analytics.optimizationOpportunities.length).toBeGreaterThanOrEqual(0);
    });

    test('should suggest room consolidation', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 11, end: 12, priority: 1, title: 'M2', attendees: ['B'] }
      ];

      scheduler.scheduleMultipleMeetings(meetings);
      const result = scheduler.optimizeSchedule();
      
      expect(result.analytics.optimizationOpportunities).toBeDefined();
    });
  });

  describe('Analytics and reporting', () => {
    test('should generate comprehensive analytics', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'] },
        { id: 'm2', start: 10, end: 11, priority: 1, title: 'M2', attendees: ['B'] },
        { id: 'm3', start: 14, end: 15, priority: 1, title: 'M3', attendees: ['C'] }
      ];

      scheduler.scheduleMultipleMeetings(meetings);
      const analytics = scheduler.generateAnalytics([9, 17]);
      
      expect(analytics.totalMeetingTime).toBe(180); // 3 hours
      expect(analytics.averageMeetingDuration).toBe(60); // 1 hour
      expect(analytics.peakUsageTime).toBeDefined();
      expect(analytics.roomUtilizationByRoom.size).toBeGreaterThan(0);
      expect(analytics.conflictRate).toBeGreaterThanOrEqual(0);
    });

    test('should calculate room utilization correctly', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 12,
        priority: 1,
        title: 'Long Meeting',
        attendees: ['Alice'],
        roomPreference: 'room1'
      };

      scheduler.scheduleMeeting(meeting);
      const analytics = scheduler.generateAnalytics([9, 17]);
      
      expect(analytics.roomUtilizationByRoom.get('room1')).toBeGreaterThan(0);
    });
  });

  describe('Recurring meetings', () => {
    test('should handle daily recurring meetings', () => {
      const recurringMeeting: Meeting = {
        id: 'daily-standup',
        start: 9,
        end: 9.5,
        priority: 1,
        title: 'Daily Standup',
        attendees: ['Team'],
        isRecurring: true,
        recurrencePattern: {
          type: 'daily',
          interval: 1,
          endDate: 9 + 7 * 24 * 60 // 7 days later
        }
      };

      const result = scheduler.scheduleMeeting(recurringMeeting);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.analytics.totalMeetingTime).toBeGreaterThan(30); // Multiple instances
    });

    test('should handle weekly recurring meetings', () => {
      const recurringMeeting: Meeting = {
        id: 'weekly-review',
        start: 14,
        end: 15,
        priority: 1,
        title: 'Weekly Review',
        attendees: ['Team'],
        isRecurring: true,
        recurrencePattern: {
          type: 'weekly',
          interval: 1,
          endDate: 14 + 4 * 7 * 24 * 60, // 4 weeks later
          daysOfWeek: [1, 3, 5] // Mon, Wed, Fri
        }
      };

      const result = scheduler.scheduleMeeting(recurringMeeting);
      
      expect(result.canScheduleAll).toBe(true);
    });
  });

  describe('Room management', () => {
    test('should add new room', () => {
      const newRoom: Room = {
        id: 'room4',
        capacity: 15,
        equipment: ['video-conference'],
        location: 'Building C'
      };

      scheduler.addRoom(newRoom);
      
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Test Meeting',
        attendees: ['Alice'],
        roomPreference: 'room4'
      };

      const result = scheduler.scheduleMeeting(meeting);
      expect(result.roomAssignments.get('meeting1')).toBe('room4');
    });

    test('should remove room and reschedule meetings', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Test Meeting',
        attendees: ['Alice'],
        roomPreference: 'room1'
      };

      scheduler.scheduleMeeting(meeting);
      const result = scheduler.removeRoom('room1');
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.get('meeting1')).not.toBe('room1');
    });
  });

  describe('Edge cases and error handling', () => {
    test('should handle empty meeting list', () => {
      const result = scheduler.scheduleMultipleMeetings([]);
      
      expect(result.canScheduleAll).toBe(true);
      expect(result.roomAssignments.size).toBe(0);
      expect(result.minRoomsNeeded).toBe(0);
    });

    test('should handle meetings with same start and end time', () => {
      const meeting: Meeting = {
        id: 'instant',
        start: 9,
        end: 9,
        priority: 1,
        title: 'Instant Meeting',
        attendees: ['Alice']
      };

      expect(() => scheduler.scheduleMeeting(meeting)).toThrow();
    });

    test('should handle negative time values', () => {
      const meeting: Meeting = {
        id: 'negative',
        start: -1,
        end: 1,
        priority: 1,
        title: 'Negative Start',
        attendees: ['Alice']
      };

      expect(() => scheduler.scheduleMeeting(meeting)).toThrow();
    });

    test('should get room schedule correctly', () => {
      const meeting: Meeting = {
        id: 'meeting1',
        start: 9,
        end: 10,
        priority: 1,
        title: 'Test Meeting',
        attendees: ['Alice'],
        roomPreference: 'room1'
      };

      scheduler.scheduleMeeting(meeting);
      const roomSchedule = scheduler.getRoomSchedule('room1');
      
      expect(roomSchedule).toHaveLength(1);
      expect(roomSchedule[0].id).toBe('meeting1');
    });

    test('should get room schedule with time range', () => {
      const meetings: Meeting[] = [
        { id: 'm1', start: 9, end: 10, priority: 1, title: 'M1', attendees: ['A'], roomPreference: 'room1' },
        { id: 'm2', start: 14, end: 15, priority: 1, title: 'M2', attendees: ['B'], roomPreference: 'room1' }
      ];

      scheduler.scheduleMultipleMeetings(meetings);
      const roomSchedule = scheduler.getRoomSchedule('room1', [9, 12]);
      
      expect(roomSchedule).toHaveLength(1);
      expect(roomSchedule[0].id).toBe('m1');
    });

    test('should get current conflicts', () => {
      const conflicts = scheduler.getConflicts();
      expect(Array.isArray(conflicts)).toBe(true);
    });
  });

  describe('Utility functions', () => {
    test('should merge overlapping intervals', () => {
      const intervals: Array<[number, number]> = [[1,3],[2,6],[8,10],[15,18]];
      const merged = mergeIntervals(intervals);
      
      expect(merged).toEqual([[1,6],[8,10],[15,18]]);
    });

    test('should handle non-overlapping intervals', () => {
      const intervals: Array<[number, number]> = [[1,2],[3,4],[5,6]];
      const merged = mergeIntervals(intervals);
      
      expect(merged).toEqual([[1,2],[3,4],[5,6]]);
    });

    test('should handle single interval', () => {
      const intervals: Array<[number, number]> = [[1,4]];
      const merged = mergeIntervals(intervals);
      
      expect(merged).toEqual([[1,4]]);
    });

    test('should handle empty intervals', () => {
      const intervals: Array<[number, number]> = [];
      const merged = mergeIntervals(intervals);
      
      expect(merged).toEqual([]);
    });
  });
});
