declare module '*.md';
declare module '*.html';
declare module '*.json';
declare module '*.png';
declare module '*.svg';

declare namespace Streamline {
	interface _ {
		future<R>(fn: (_: Streamline._) => R): (_: Streamline._) => R;
		promise<R>(fn: (_: Streamline._) => R): Promise<R>;
		wait<R>(_: Streamline._, promise: PromiseLike<R>): R;
		run<R>(fn: (_: Streamline._) => R, callback?: (err: any, result?: R) => void): void;
		cast<R>(fn: (cb: (err?: any, val?: R) => void) => void): (_: _) => R;
		cast<R, T1>(fn: (cb: (err?: any, val?: R) => void, a1: T1) => void): (_: _, a1: T1) => R;
		cast<R, T1, T2>(fn: (cb: (err?: any, val?: R) => void, a1: T1, a2: T2) => void): (_: _, a1: T1, a2: T2) => R;
		cast<R, T1, T2, T3>(fn: (cb: (err?: any, val?: R) => void, a1: T1, a2: T2, a3: T3) => void): (_: _, a1: T1, a2: T2, a3: T3) => R;
		cast<R, T1, T2, T3, T4>(fn: (cb: (err?: any, val?: R) => void, a1: T1, a2: T2, a3: T3, a4: T4) => void): (_: _, a1: T1, a2: T2, a3: T3, a4: T4) => R;
		cast<R, T1, T2, T3, T4, T5>(fn: (cb: (err?: any, val?: R) => void, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => void): (_: _, a1: T1, a2: T2, a3: T3, a4: T4, a5: T5) => R;
		cast<T1, R>(a1: T1, fn: (cb: (err?: any, val?: R) => void) => void): (a1: T1, _: _) => R;
		cast<T1, T2, R>(a1: T1, a2: T2, fn: (cb: (err?: any, val?: R) => void) => void): (a1: T1, a2: T2, _: _) => R;
		cast<T1, T2, T3, R>(a1: T1, a2: T2, a3: T3, fn: (cb: (err?: any, val?: R) => void) => void): (a1: T1, a2: T2, a3: T3, _: _) => R;
		cast<T1, T2, T3, T4, R>(a1: T1, a2: T2, a3: T3, a4: T4, fn: (cb: (err?: any, val?: R) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4, _: _) => R;
		cast<T1, T2, T3, T4, T5, R>(a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, fn: (cb: (err?: any, val?: R) => void) => void): (a1: T1, a2: T2, a3: T3, a4: T4, a5: T5, _: _) => R;
		// catchall for 7 args or more
		cast(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, ...a: any[]): (a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, ...a: any[]) => any;
		funnel(limit: number): <R>(_: Streamline._, body: (_: Streamline._) => R | undefined) => R | undefined;
		funnel(limit: number): <R>(_: Streamline._, body: (_: Streamline._) => R) => R;
		collect(_: Streamline._, futures: ((_: Streamline._) => any)[]): any[];
		context: any;
		withContext<T extends Function>(body: T, context?: any): T;
		handshake(): Handshake;
		queue<T>(max?: number): Queue<T>;
		sleep(_: Streamline._, millis: number): void;
		runtime: string;
	}
	interface Handshake {
		wait(_: Streamline._): void;
		notify(): void;
	}

	interface Queue<T> {
		read(_: Streamline._): T;
		write(_: Streamline._, item?: T): any;
		put(item: T, force?: boolean): boolean;
		end(): void;
		peek(): T;
		contents(): T[];
		adjust(fn: (oldContents: T[]) => T[]): void;
		length: number;
	}
}

declare module "streamline-runtime" {
	export type _ = Streamline._;
	export const _: Streamline._;
}
// Promise then override, to get promise.then(_, _) working.

declare interface Promise<T> {
	then(_: Streamline._, __: Streamline._): T
}

// Additional Array methods
// For now don't advertize options object, only number arg
declare interface Array<T> {
	forEach_(_: Streamline._, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => void, thisArg?: any): void;
	forEach_(_: Streamline._, parallel: number, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => void, thisArg?: any): void;
	map_<U>(_: Streamline._, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => U, thisArg?: any): U[];
	map_<U>(_: Streamline._, parallel: number, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => U, thisArg?: any): U[];
	filter_(_: Streamline._, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => any, thisArg?: any): T[];
	filter_(_: Streamline._, parallel: number, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => any, thisArg?: any): T[];
	every_(_: Streamline._, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
	some_(_: Streamline._, callbackFn: (_: Streamline._, value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
	reduce_<U>(_: Streamline._, callbackFn: (_: Streamline._, previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
	reduceRight_<U>(_: Streamline._, callbackFn: (_: Streamline._, previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
	sort_(_: Streamline._, compareFn?: (_: Streamline._, a: T, b: T) => number): this;
}
// Additional Func(ion method
declare interface Function {
	apply_(_: Streamline._, thisArg: any, argArray: any, index?: number): any;
}

declare module "fs" {
	import { _ } from "streamline-runtime";
	import * as stream from "stream";
	import * as events from "events";
	export function rename(oldPath: string, newPath: string, _?: _): void;
	export function truncate(path: string | Buffer, _?: _): void;
	export function truncate(path: string | Buffer, len: number, _?: _): void;
	export function ftruncate(fd: number, _?: _): void;
	export function ftruncate(fd: number, len: number, _?: _): void;
	export function chown(path: string | Buffer, uid: number, gid: number, _?: _): void;
	export function fchown(fd: number, uid: number, gid: number, _?: _): void;
	export function lchown(path: string | Buffer, uid: number, gid: number, _?: _): void;
	export function chmod(path: string | Buffer, mode: number, _?: _): void;
	export function chmod(path: string | Buffer, mode: string, _?: _): void;
	export function fchmod(fd: number, mode: number, _?: _): void;
	export function fchmod(fd: number, mode: string, _?: _): void;
	export function lchmod(path: string | Buffer, mode: number, _?: _): void;
	export function lchmod(path: string | Buffer, mode: string, _?: _): void;
	export function stat(path: string | Buffer, _?: _): Stats;
	export function lstat(path: string | Buffer, _?: _): Stats;
	export function fstat(fd: number, _?: _): Stats;
	export function link(srcpath: string | Buffer, dstpath: string | Buffer, _?: _): void;
	export function symlink(srcpath: string | Buffer, dstpath: string | Buffer, type?: string, _?: _): void;
	export function readlink(path: string | Buffer, _?: _): string;
	export function realpath(path: string | Buffer, _?: _): string;
	export function realpath(path: string | Buffer, cache: { [path: string]: string }, _: _): string;
	export function unlink(path: string | Buffer, _?: _): void;
	export function rmdir(path: string | Buffer, _?: _): void;
	export function mkdir(path: string | Buffer, _?: _): void;
	export function mkdir(path: string | Buffer, mode: number, _?: _): void;
	export function mkdir(path: string | Buffer, mode: string, _?: _): void;
	export function mkdtemp(prefix: string, _?: _): string;
	export function readdir(path: string | Buffer, _?: _): string[];
	export function close(fd: number, _?: _): void;
	export function open(path: string | Buffer, flags: string | number, _: _): number;
	export function open(path: string | Buffer, flags: string | number, mode: number, _: _): number;
	export function utimes(path: string | Buffer, atime: number, mtime: number, _?: _): void;
	export function utimes(path: string | Buffer, atime: Date, mtime: Date, _?: _): void;
	export function futimes(fd: number, atime: number, mtime: number, _?: _): void;
	export function futimes(fd: number, atime: Date, mtime: Date, _?: _): void;
	export function fsync(fd: number, _?: _): void;
	export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, _?: _): number;
	export function write(fd: number, buffer: Buffer, offset: number, length: number, position: number, _?: [_]): [number, Buffer];
	export function write(fd: number, buffer: Buffer, offset: number, length: number, _?: _): number;
	export function write(fd: number, buffer: Buffer, offset: number, length: number, _?: [_]): [number, Buffer];
	export function write(fd: number, data: any, _?: _): number;
	export function write(fd: number, data: any, _?: [_]): [number, string];
	export function write(fd: number, data: any, offset: number, _?: _): number;
	export function write(fd: number, data: any, offset: number, _?: [_]): [number, string];
	export function write(fd: number, data: any, offset: number, encoding: string, _?: _): number;
	export function write(fd: number, data: any, offset: number, encoding: string, _?: [_]): [number, string];
	export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, _?: _): number;
	export function read(fd: number, buffer: Buffer, offset: number, length: number, position: number, _?: [_]): [number, Buffer];
	export function readFile(filename: string, encoding: string, _: _): string;
	export function readFile(filename: string, options: { encoding: string; flag?: string; }, _: _): string;
	export function readFile(filename: string, options: { flag?: string; }, _: _): Buffer;
	export function readFile(filename: string, _: _): Buffer;
	export function writeFile(filename: string, data: any, _?: _): void;
	export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, _?: _): void;
	export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, _?: _): void;
	export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, _?: _): void;
	export function appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, _?: _): void;
	export function appendFile(filename: string, data: any, _?: _): void;
	export function exists(path: string | Buffer, _: _, __: _): void;
	export function access(path: string | Buffer, _: _): void;
	export function access(path: string | Buffer, mode: number, _: _): void;
}