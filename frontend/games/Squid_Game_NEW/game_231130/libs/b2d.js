"use strict";
var B2D, __extends = this && this.__extends || function () {
    var t = function (e, i) {
        return (t = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function (t, e) {
                t.__proto__ = e
            } || function (t, e) {
                for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
            })(e, i)
    };
    return function (e, i) {
        function __() {
            this.constructor = e
        }
        t(e, i), e.prototype = null === i ? Object.create(i) : (__.prototype = i.prototype, new __)
    }
}();
! function (t) {
    function b2Assert(t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
    }
    t.b2Assert = b2Assert, t.b2_maxFloat = 1e37, t.b2_epsilon = 1e-5, t.b2_epsilon_sq = t.b2_epsilon * t.b2_epsilon, t.b2_pi = 3.14159265359, t.b2_maxManifoldPoints = 2, t.b2_maxPolygonVertices = 8, t.b2_aabbExtension = .1, t.b2_aabbMultiplier = 2, t.b2_linearSlop = .008, t.b2_angularSlop = 2 / 180 * t.b2_pi, t.b2_polygonRadius = 2 * t.b2_linearSlop, t.b2_maxSubSteps = 8, t.b2_maxTOIContacts = 32, t.b2_velocityThreshold = 1, t.b2_maxLinearCorrection = .2, t.b2_maxAngularCorrection = 8 / 180 * t.b2_pi, t.b2_maxTranslation = 2, t.b2_maxTranslationSquared = t.b2_maxTranslation * t.b2_maxTranslation, t.b2_maxRotation = .5 * t.b2_pi, t.b2_maxRotationSquared = t.b2_maxRotation * t.b2_maxRotation, t.b2_baumgarte = .2, t.b2_toiBaumgarte = .75, t.b2_invalidParticleIndex = -1, t.b2_maxParticleIndex = 2147483647, t.b2_particleStride = .75, t.b2_minParticleWeight = 1, t.b2_maxParticlePressure = .25, t.b2_maxParticleForce = .5, t.b2_maxTriadDistance = 2, t.b2_maxTriadDistanceSquared = t.b2_maxTriadDistance * t.b2_maxTriadDistance, t.b2_minParticleSystemBufferCapacity = 256, t.b2_barrierCollisionTime = 2.5, t.b2_timeToSleep = .5, t.b2_linearSleepTolerance = .01, t.b2_angularSleepTolerance = 2 / 180 * t.b2_pi, t.b2Alloc = function (t) {
        return null
    }, t.b2Free = function (t) {}, t.b2Log = function (t) {
        for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i]
    };
    var e = function () {
        function b2Version(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.major = 0, this.minor = 0, this.revision = 0, this.major = t, this.minor = e, this.revision = i
        }
        return b2Version.prototype.toString = function () {
            return this.major + "." + this.minor + "." + this.revision
        }, b2Version
    }();

    function b2MakeArray(t, e) {
        for (var i = [], o = 0; o < t; ++o) i.push(e(o));
        return i
    }

    function b2MakeNullArray(t) {
        for (var e = [], i = 0; i < t; ++i) e.push(null);
        return e
    }

    function b2MakeNumberArray(t, e) {
        void 0 === e && (e = 0);
        for (var i = [], o = 0; o < t; ++o) i.push(e);
        return i
    }

    function b2Abs(t) {
        return t < 0 ? -t : t
    }

    function b2Min(t, e) {
        return t < e ? t : e
    }

    function b2Max(t, e) {
        return t > e ? t : e
    }

    function b2Clamp(t, e, i) {
        return t < e ? e : t > i ? i : t
    }

    function b2Sq(t) {
        return t * t
    }

    function b2InvSqrt(t) {
        return 1 / Math.sqrt(t)
    }

    function b2Sqrt(t) {
        return Math.sqrt(t)
    }

    function b2Pow(t, e) {
        return Math.pow(t, e)
    }

    function b2Asin(t) {
        return Math.asin(t)
    }

    function b2Atan2(t, e) {
        return Math.atan2(t, e)
    }
    t.b2Version = e, t.b2_version = new e(2, 3, 2), t.b2_changelist = 313, t.b2ParseInt = function (t) {
        return parseInt(t, 10)
    }, t.b2ParseUInt = function (t) {
        return Math.abs(parseInt(t, 10))
    }, t.b2MakeArray = b2MakeArray, t.b2MakeNullArray = b2MakeNullArray, t.b2MakeNumberArray = b2MakeNumberArray, t.b2_pi_over_180 = t.b2_pi / 180, t.b2_180_over_pi = 180 / t.b2_pi, t.b2_two_pi = 2 * t.b2_pi, t.b2Abs = b2Abs, t.b2Min = b2Min, t.b2Max = b2Max, t.b2Clamp = b2Clamp, t.b2Swap = function (t, e) {
        var i = t[0];
        t[0] = e[0], e[0] = i
    }, t.b2IsValid = function (t) {
        return isFinite(t)
    }, t.b2Sq = b2Sq, t.b2InvSqrt = b2InvSqrt, t.b2Sqrt = b2Sqrt, t.b2Pow = b2Pow, t.b2DegToRad = function (e) {
        return e * t.b2_pi_over_180
    }, t.b2RadToDeg = function (e) {
        return e * t.b2_180_over_pi
    }, t.b2Cos = function (t) {
        return Math.cos(t)
    }, t.b2Sin = function (t) {
        return Math.sin(t)
    }, t.b2Acos = function (t) {
        return Math.acos(t)
    }, t.b2Asin = b2Asin, t.b2Atan2 = b2Atan2, t.b2NextPowerOfTwo = function (t) {
        return t |= t >> 1 & 2147483647, t |= t >> 2 & 1073741823, t |= t >> 4 & 268435455, t |= t >> 8 & 16777215, 1 + (t |= t >> 16 & 65535)
    }, t.b2IsPowerOfTwo = function (t) {
        return t > 0 && 0 == (t & t - 1)
    }, t.b2Random = function () {
        return 2 * Math.random() - 1
    }, t.b2RandomRange = function (t, e) {
        return (e - t) * Math.random() + t
    };
    var i = function () {
        function b2Vec2(t, e) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
        }
        return b2Vec2.prototype.Clone = function () {
            return new b2Vec2(this.x, this.y)
        }, b2Vec2.prototype.SetZero = function () {
            return this.x = 0, this.y = 0, this
        }, b2Vec2.prototype.Set = function (t, e) {
            return this.x = t, this.y = e, this
        }, b2Vec2.prototype.Copy = function (t) {
            return this.x = t.x, this.y = t.y, this
        }, b2Vec2.prototype.SelfAdd = function (t) {
            return this.x += t.x, this.y += t.y, this
        }, b2Vec2.prototype.SelfAddXY = function (t, e) {
            return this.x += t, this.y += e, this
        }, b2Vec2.prototype.SelfSub = function (t) {
            return this.x -= t.x, this.y -= t.y, this
        }, b2Vec2.prototype.SelfSubXY = function (t, e) {
            return this.x -= t, this.y -= e, this
        }, b2Vec2.prototype.SelfMul = function (t) {
            return this.x *= t, this.y *= t, this
        }, b2Vec2.prototype.SelfMulAdd = function (t, e) {
            return this.x += t * e.x, this.y += t * e.y, this
        }, b2Vec2.prototype.SelfMulSub = function (t, e) {
            return this.x -= t * e.x, this.y -= t * e.y, this
        }, b2Vec2.prototype.Dot = function (t) {
            return this.x * t.x + this.y * t.y
        }, b2Vec2.prototype.Cross = function (t) {
            return this.x * t.y - this.y * t.x
        }, b2Vec2.prototype.Length = function () {
            var t = this.x,
                e = this.y;
            return Math.sqrt(t * t + e * e)
        }, b2Vec2.prototype.LengthSquared = function () {
            var t = this.x,
                e = this.y;
            return t * t + e * e
        }, b2Vec2.prototype.Normalize = function () {
            var e = this.Length();
            if (e >= t.b2_epsilon) {
                var i = 1 / e;
                this.x *= i, this.y *= i
            }
            return e
        }, b2Vec2.prototype.SelfNormalize = function () {
            var e = this.Length();
            if (e >= t.b2_epsilon) {
                var i = 1 / e;
                this.x *= i, this.y *= i
            }
            return this
        }, b2Vec2.prototype.SelfRotate = function (t) {
            var e = Math.cos(t),
                i = Math.sin(t),
                o = this.x;
            return this.x = e * o - i * this.y, this.y = i * o + e * this.y, this
        }, b2Vec2.prototype.IsValid = function () {
            return isFinite(this.x) && isFinite(this.y)
        }, b2Vec2.prototype.SelfCrossVS = function (t) {
            var e = this.x;
            return this.x = t * this.y, this.y = -t * e, this
        }, b2Vec2.prototype.SelfCrossSV = function (t) {
            var e = this.x;
            return this.x = -t * this.y, this.y = t * e, this
        }, b2Vec2.prototype.SelfMinV = function (t) {
            return this.x = b2Min(this.x, t.x), this.y = b2Min(this.y, t.y), this
        }, b2Vec2.prototype.SelfMaxV = function (t) {
            return this.x = b2Max(this.x, t.x), this.y = b2Max(this.y, t.y), this
        }, b2Vec2.prototype.SelfAbs = function () {
            return this.x = b2Abs(this.x), this.y = b2Abs(this.y), this
        }, b2Vec2.prototype.SelfNeg = function () {
            return this.x = -this.x, this.y = -this.y, this
        }, b2Vec2.prototype.SelfSkew = function () {
            var t = this.x;
            return this.x = -this.y, this.y = t, this
        }, b2Vec2.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2Vec2
            })
        }, b2Vec2.AbsV = function (t, e) {
            return function (t, e) {
                return e.x = b2Abs(t.x), e.y = b2Abs(t.y), e
            }(t, e)
        }, b2Vec2.MinV = function (t, e, i) {
            return function (t, e, i) {
                return i.x = b2Min(t.x, e.x), i.y = b2Min(t.y, e.y), i
            }(t, e, i)
        }, b2Vec2.MaxV = function (t, e, i) {
            return function (t, e, i) {
                return i.x = b2Max(t.x, e.x), i.y = b2Max(t.y, e.y), i
            }(t, e, i)
        }, b2Vec2.ClampV = function (t, e, i, o) {
            return function (t, e, i, o) {
                return o.x = b2Clamp(t.x, e.x, i.x), o.y = b2Clamp(t.y, e.y, i.y), o
            }(t, e, i, o)
        }, b2Vec2.RotateV = function (t, e, i) {
            return function (t, e, i) {
                var o = t.x,
                    s = t.y,
                    n = Math.cos(e),
                    r = Math.sin(e);
                return i.x = n * o - r * s, i.y = r * o + n * s, i
            }(t, e, i)
        }, b2Vec2.DotVV = function (t, e) {
            return function (t, e) {
                return t.x * e.x + t.y * e.y
            }(t, e)
        }, b2Vec2.CrossVV = function (t, e) {
            return function (t, e) {
                return t.x * e.y - t.y * e.x
            }(t, e)
        }, b2Vec2.CrossVS = function (t, e, i) {
            return function (t, e, i) {
                var o = t.x;
                return i.x = e * t.y, i.y = -e * o, i
            }(t, e, i)
        }, b2Vec2.CrossVOne = function (t, e) {
            return function (t, e) {
                var i = t.x;
                return e.x = t.y, e.y = -i, e
            }(t, e)
        }, b2Vec2.CrossSV = function (t, e, i) {
            return function (t, e, i) {
                var o = e.x;
                return i.x = -t * e.y, i.y = t * o, i
            }(t, e, i)
        }, b2Vec2.CrossOneV = function (t, e) {
            return function (t, e) {
                var i = t.x;
                return e.x = -t.y, e.y = i, e
            }(t, e)
        }, b2Vec2.AddVV = function (t, e, i) {
            return b2AddVV(t, e, i)
        }, b2Vec2.SubVV = function (t, e, i) {
            return b2SubVV(t, e, i)
        }, b2Vec2.MulSV = function (t, e, i) {
            return function (t, e, i) {
                return i.x = e.x * t, i.y = e.y * t, i
            }(t, e, i)
        }, b2Vec2.MulVS = function (t, e, i) {
            return function (t, e, i) {
                return i.x = t.x * e, i.y = t.y * e, i
            }(t, e, i)
        }, b2Vec2.AddVMulSV = function (t, e, i, o) {
            return function (t, e, i, o) {
                return o.x = t.x + e * i.x, o.y = t.y + e * i.y, o
            }(t, e, i, o)
        }, b2Vec2.SubVMulSV = function (t, e, i, o) {
            return function (t, e, i, o) {
                return o.x = t.x - e * i.x, o.y = t.y - e * i.y, o
            }(t, e, i, o)
        }, b2Vec2.AddVCrossSV = function (t, e, i, o) {
            return function (t, e, i, o) {
                var s = i.x;
                return o.x = t.x - e * i.y, o.y = t.y + e * s, o
            }(t, e, i, o)
        }, b2Vec2.MidVV = function (t, e, i) {
            return function (t, e, i) {
                return i.x = .5 * (t.x + e.x), i.y = .5 * (t.y + e.y), i
            }(t, e, i)
        }, b2Vec2.ExtVV = function (t, e, i) {
            return function (t, e, i) {
                return i.x = .5 * (e.x - t.x), i.y = .5 * (e.y - t.y), i
            }(t, e, i)
        }, b2Vec2.IsEqualToV = function (t, e) {
            return function (t, e) {
                return t.x === e.x && t.y === e.y
            }(t, e)
        }, b2Vec2.DistanceVV = function (t, e) {
            return function (t, e) {
                var i = t.x - e.x,
                    o = t.y - e.y;
                return Math.sqrt(i * i + o * o)
            }(t, e)
        }, b2Vec2.DistanceSquaredVV = function (t, e) {
            return function (t, e) {
                var i = t.x - e.x,
                    o = t.y - e.y;
                return i * i + o * o
            }(t, e)
        }, b2Vec2.NegV = function (t, e) {
            return function (t, e) {
                return e.x = -t.x, e.y = -t.y, e
            }(t, e)
        }, b2Vec2.ZERO = new b2Vec2(0, 0), b2Vec2.UNITX = new b2Vec2(1, 0), b2Vec2.UNITY = new b2Vec2(0, 1), b2Vec2.s_t0 = new b2Vec2, b2Vec2.s_t1 = new b2Vec2, b2Vec2.s_t2 = new b2Vec2, b2Vec2.s_t3 = new b2Vec2, b2Vec2
    }();

    function b2AddVV(t, e, i) {
        return i.x = t.x + e.x, i.y = t.y + e.y, i
    }

    function b2SubVV(t, e, i) {
        return i.x = t.x - e.x, i.y = t.y - e.y, i
    }
    t.b2Vec2 = i, t.b2Vec2_zero = new i(0, 0);
    var o = function () {
        function b2Vec3(t, e, i) {
            void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), this.x = t, this.y = e, this.z = i
        }
        return b2Vec3.prototype.Clone = function () {
            return new b2Vec3(this.x, this.y, this.z)
        }, b2Vec3.prototype.SetZero = function () {
            return this.x = 0, this.y = 0, this.z = 0, this
        }, b2Vec3.prototype.SetXYZ = function (t, e, i) {
            return this.x = t, this.y = e, this.z = i, this
        }, b2Vec3.prototype.Copy = function (t) {
            return this.x = t.x, this.y = t.y, this.z = t.z, this
        }, b2Vec3.prototype.SelfNeg = function () {
            return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
        }, b2Vec3.prototype.SelfAdd = function (t) {
            return this.x += t.x, this.y += t.y, this.z += t.z, this
        }, b2Vec3.prototype.SelfAddXYZ = function (t, e, i) {
            return this.x += t, this.y += e, this.z += i, this
        }, b2Vec3.prototype.SelfSub = function (t) {
            return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
        }, b2Vec3.prototype.SelfSubXYZ = function (t, e, i) {
            return this.x -= t, this.y -= e, this.z -= i, this
        }, b2Vec3.prototype.SelfMul = function (t) {
            return this.x *= t, this.y *= t, this.z *= t, this
        }, b2Vec3.DotV3V3 = function (t, e) {
            return b2DotV3V3(t, e)
        }, b2Vec3.CrossV3V3 = function (t, e, i) {
            return b2CrossV3V3(t, e, i)
        }, b2Vec3.ZERO = new b2Vec3(0, 0, 0), b2Vec3.s_t0 = new b2Vec3, b2Vec3
    }();

    function b2DotV3V3(t, e) {
        return t.x * e.x + t.y * e.y + t.z * e.z
    }

    function b2CrossV3V3(t, e, i) {
        var o = t.x,
            s = t.y,
            n = t.z,
            r = e.x,
            a = e.y,
            l = e.z;
        return i.x = s * l - n * a, i.y = n * r - o * l, i.z = o * a - s * r, i
    }
    t.b2Vec3 = o;
    var s = function () {
        function b2Mat22() {
            this.ex = new i(1, 0), this.ey = new i(0, 1)
        }
        return b2Mat22.prototype.Clone = function () {
            return (new b2Mat22).Copy(this)
        }, b2Mat22.FromVV = function (t, e) {
            return (new b2Mat22).SetVV(t, e)
        }, b2Mat22.FromSSSS = function (t, e, i, o) {
            return (new b2Mat22).SetSSSS(t, e, i, o)
        }, b2Mat22.FromAngle = function (t) {
            return (new b2Mat22).SetAngle(t)
        }, b2Mat22.prototype.SetSSSS = function (t, e, i, o) {
            return this.ex.Set(t, i), this.ey.Set(e, o), this
        }, b2Mat22.prototype.SetVV = function (t, e) {
            return this.ex.Copy(t), this.ey.Copy(e), this
        }, b2Mat22.prototype.SetAngle = function (t) {
            var e = Math.cos(t),
                i = Math.sin(t);
            return this.ex.Set(e, i), this.ey.Set(-i, e), this
        }, b2Mat22.prototype.Copy = function (t) {
            return this.ex.Copy(t.ex), this.ey.Copy(t.ey), this
        }, b2Mat22.prototype.SetIdentity = function () {
            return this.ex.Set(1, 0), this.ey.Set(0, 1), this
        }, b2Mat22.prototype.SetZero = function () {
            return this.ex.SetZero(), this.ey.SetZero(), this
        }, b2Mat22.prototype.GetAngle = function () {
            return Math.atan2(this.ex.y, this.ex.x)
        }, b2Mat22.prototype.GetInverse = function (t) {
            var e = this.ex.x,
                i = this.ey.x,
                o = this.ex.y,
                s = this.ey.y,
                n = e * s - i * o;
            return 0 !== n && (n = 1 / n), t.ex.x = n * s, t.ey.x = -n * i, t.ex.y = -n * o, t.ey.y = n * e, t
        }, b2Mat22.prototype.Solve = function (t, e, i) {
            var o = this.ex.x,
                s = this.ey.x,
                n = this.ex.y,
                r = this.ey.y,
                a = o * r - s * n;
            return 0 !== a && (a = 1 / a), i.x = a * (r * t - s * e), i.y = a * (o * e - n * t), i
        }, b2Mat22.prototype.SelfAbs = function () {
            return this.ex.SelfAbs(), this.ey.SelfAbs(), this
        }, b2Mat22.prototype.SelfInv = function () {
            return this.GetInverse(this)
        }, b2Mat22.prototype.SelfAddM = function (t) {
            return this.ex.SelfAdd(t.ex), this.ey.SelfAdd(t.ey), this
        }, b2Mat22.prototype.SelfSubM = function (t) {
            return this.ex.SelfSub(t.ex), this.ey.SelfSub(t.ey), this
        }, b2Mat22.AbsM = function (t, e) {
            return function (t, e) {
                var i = t.ex,
                    o = t.ey;
                return e.ex.x = b2Abs(i.x), e.ex.y = b2Abs(i.y), e.ey.x = b2Abs(o.x), e.ey.y = b2Abs(o.y), e
            }(t, e)
        }, b2Mat22.MulMV = function (t, e, i) {
            return function (t, e, i) {
                var o = t.ex,
                    s = t.ey,
                    n = e.x,
                    r = e.y;
                return i.x = o.x * n + s.x * r, i.y = o.y * n + s.y * r, i
            }(t, e, i)
        }, b2Mat22.MulTMV = function (t, e, i) {
            return function (t, e, i) {
                var o = t.ex,
                    s = t.ey,
                    n = e.x,
                    r = e.y;
                return i.x = o.x * n + o.y * r, i.y = s.x * n + s.y * r, i
            }(t, e, i)
        }, b2Mat22.AddMM = function (t, e, i) {
            return function (t, e, i) {
                var o = t.ex,
                    s = t.ey,
                    n = e.ex,
                    r = e.ey;
                return i.ex.x = o.x + n.x, i.ex.y = o.y + n.y, i.ey.x = s.x + r.x, i.ey.y = s.y + r.y, i
            }(t, e, i)
        }, b2Mat22.MulMM = function (t, e, i) {
            return function (t, e, i) {
                var o = t.ex.x,
                    s = t.ex.y,
                    n = t.ey.x,
                    r = t.ey.y,
                    a = e.ex.x,
                    l = e.ex.y,
                    m = e.ey.x,
                    _ = e.ey.y;
                return i.ex.x = o * a + n * l, i.ex.y = s * a + r * l, i.ey.x = o * m + n * _, i.ey.y = s * m + r * _, i
            }(t, e, i)
        }, b2Mat22.MulTMM = function (t, e, i) {
            return function (t, e, i) {
                var o = t.ex.x,
                    s = t.ex.y,
                    n = t.ey.x,
                    r = t.ey.y,
                    a = e.ex.x,
                    l = e.ex.y,
                    m = e.ey.x,
                    _ = e.ey.y;
                return i.ex.x = o * a + s * l, i.ex.y = n * a + r * l, i.ey.x = o * m + s * _, i.ey.y = n * m + r * _, i
            }(t, e, i)
        }, b2Mat22.IDENTITY = new b2Mat22, b2Mat22
    }();
    t.b2Mat22 = s;
    var n = function () {
        function b2Mat33() {
            this.ex = new o(1, 0, 0), this.ey = new o(0, 1, 0), this.ez = new o(0, 0, 1)
        }
        return b2Mat33.prototype.Clone = function () {
            return (new b2Mat33).Copy(this)
        }, b2Mat33.prototype.SetVVV = function (t, e, i) {
            return this.ex.Copy(t), this.ey.Copy(e), this.ez.Copy(i), this
        }, b2Mat33.prototype.Copy = function (t) {
            return this.ex.Copy(t.ex), this.ey.Copy(t.ey), this.ez.Copy(t.ez), this
        }, b2Mat33.prototype.SetIdentity = function () {
            return this.ex.SetXYZ(1, 0, 0), this.ey.SetXYZ(0, 1, 0), this.ez.SetXYZ(0, 0, 1), this
        }, b2Mat33.prototype.SetZero = function () {
            return this.ex.SetZero(), this.ey.SetZero(), this.ez.SetZero(), this
        }, b2Mat33.prototype.SelfAddM = function (t) {
            return this.ex.SelfAdd(t.ex), this.ey.SelfAdd(t.ey), this.ez.SelfAdd(t.ez), this
        }, b2Mat33.prototype.Solve33 = function (t, e, i, o) {
            var s = this.ex.x,
                n = this.ex.y,
                r = this.ex.z,
                a = this.ey.x,
                l = this.ey.y,
                m = this.ey.z,
                _ = this.ez.x,
                h = this.ez.y,
                u = this.ez.z,
                c = s * (l * u - m * h) + n * (m * _ - a * u) + r * (a * h - l * _);
            return 0 !== c && (c = 1 / c), o.x = c * (t * (l * u - m * h) + e * (m * _ - a * u) + i * (a * h - l * _)), o.y = c * (s * (e * u - i * h) + n * (i * _ - t * u) + r * (t * h - e * _)), o.z = c * (s * (l * i - m * e) + n * (m * t - a * i) + r * (a * e - l * t)), o
        }, b2Mat33.prototype.Solve22 = function (t, e, i) {
            var o = this.ex.x,
                s = this.ey.x,
                n = this.ex.y,
                r = this.ey.y,
                a = o * r - s * n;
            return 0 !== a && (a = 1 / a), i.x = a * (r * t - s * e), i.y = a * (o * e - n * t), i
        }, b2Mat33.prototype.GetInverse22 = function (t) {
            var e = this.ex.x,
                i = this.ey.x,
                o = this.ex.y,
                s = this.ey.y,
                n = e * s - i * o;
            0 !== n && (n = 1 / n), t.ex.x = n * s, t.ey.x = -n * i, t.ex.z = 0, t.ex.y = -n * o, t.ey.y = n * e, t.ey.z = 0, t.ez.x = 0, t.ez.y = 0, t.ez.z = 0
        }, b2Mat33.prototype.GetSymInverse33 = function (t) {
            var e = b2DotV3V3(this.ex, b2CrossV3V3(this.ey, this.ez, o.s_t0));
            0 !== e && (e = 1 / e);
            var i = this.ex.x,
                s = this.ey.x,
                n = this.ez.x,
                r = this.ey.y,
                a = this.ez.y,
                l = this.ez.z;
            t.ex.x = e * (r * l - a * a), t.ex.y = e * (n * a - s * l), t.ex.z = e * (s * a - n * r), t.ey.x = t.ex.y, t.ey.y = e * (i * l - n * n), t.ey.z = e * (n * s - i * a), t.ez.x = t.ex.z, t.ez.y = t.ey.z, t.ez.z = e * (i * r - s * s)
        }, b2Mat33.MulM33V3 = function (t, e, i) {
            return function (t, e, i) {
                var o = e.x,
                    s = e.y,
                    n = e.z;
                return i.x = t.ex.x * o + t.ey.x * s + t.ez.x * n, i.y = t.ex.y * o + t.ey.y * s + t.ez.y * n, i.z = t.ex.z * o + t.ey.z * s + t.ez.z * n, i
            }(t, e, i)
        }, b2Mat33.MulM33XYZ = function (t, e, i, o, s) {
            return function (t, e, i, o, s) {
                return s.x = t.ex.x * e + t.ey.x * i + t.ez.x * o, s.y = t.ex.y * e + t.ey.y * i + t.ez.y * o, s.z = t.ex.z * e + t.ey.z * i + t.ez.z * o, s
            }(t, e, i, o, s)
        }, b2Mat33.MulM33V2 = function (t, e, i) {
            return function (t, e, i) {
                var o = e.x,
                    s = e.y;
                return i.x = t.ex.x * o + t.ey.x * s, i.y = t.ex.y * o + t.ey.y * s, i
            }(t, e, i)
        }, b2Mat33.MulM33XY = function (t, e, i, o) {
            return function (t, e, i, o) {
                return o.x = t.ex.x * e + t.ey.x * i, o.y = t.ex.y * e + t.ey.y * i, o
            }(t, e, i, o)
        }, b2Mat33.IDENTITY = new b2Mat33, b2Mat33
    }();
    t.b2Mat33 = n;
    var r = function () {
        function b2Rot(t) {
            void 0 === t && (t = 0), this.s = 0, this.c = 1, t && (this.s = Math.sin(t), this.c = Math.cos(t))
        }
        return b2Rot.prototype.Clone = function () {
            return (new b2Rot).Copy(this)
        }, b2Rot.prototype.Copy = function (t) {
            return this.s = t.s, this.c = t.c, this
        }, b2Rot.prototype.SetAngle = function (t) {
            return this.s = Math.sin(t), this.c = Math.cos(t), this
        }, b2Rot.prototype.SetIdentity = function () {
            return this.s = 0, this.c = 1, this
        }, b2Rot.prototype.GetAngle = function () {
            return Math.atan2(this.s, this.c)
        }, b2Rot.prototype.GetXAxis = function (t) {
            return t.x = this.c, t.y = this.s, t
        }, b2Rot.prototype.GetYAxis = function (t) {
            return t.x = -this.s, t.y = this.c, t
        }, b2Rot.MulRR = function (t, e, i) {
            return b2MulRR(t, e, i)
        }, b2Rot.MulTRR = function (t, e, i) {
            return b2MulTRR(t, e, i)
        }, b2Rot.MulRV = function (t, e, i) {
            return b2MulRV(t, e, i)
        }, b2Rot.MulTRV = function (t, e, i) {
            return b2MulTRV(t, e, i)
        }, b2Rot.IDENTITY = new b2Rot, b2Rot
    }();

    function b2MulRR(t, e, i) {
        var o = t.c,
            s = t.s,
            n = e.c,
            r = e.s;
        return i.s = s * n + o * r, i.c = o * n - s * r, i
    }

    function b2MulTRR(t, e, i) {
        var o = t.c,
            s = t.s,
            n = e.c,
            r = e.s;
        return i.s = o * r - s * n, i.c = o * n + s * r, i
    }

    function b2MulRV(t, e, i) {
        var o = t.c,
            s = t.s,
            n = e.x,
            r = e.y;
        return i.x = o * n - s * r, i.y = s * n + o * r, i
    }

    function b2MulTRV(t, e, i) {
        var o = t.c,
            s = t.s,
            n = e.x,
            r = e.y;
        return i.x = o * n + s * r, i.y = -s * n + o * r, i
    }
    t.b2Rot = r;
    var a = function () {
        function b2Transform() {
            this.p = new i, this.q = new r
        }
        return b2Transform.prototype.Clone = function () {
            return (new b2Transform).Copy(this)
        }, b2Transform.prototype.Copy = function (t) {
            return this.p.Copy(t.p), this.q.Copy(t.q), this
        }, b2Transform.prototype.SetIdentity = function () {
            return this.p.SetZero(), this.q.SetIdentity(), this
        }, b2Transform.prototype.SetPositionRotation = function (t, e) {
            return this.p.Copy(t), this.q.Copy(e), this
        }, b2Transform.prototype.SetPositionAngle = function (t, e) {
            return this.p.Copy(t), this.q.SetAngle(e), this
        }, b2Transform.prototype.SetPosition = function (t) {
            return this.p.Copy(t), this
        }, b2Transform.prototype.SetPositionXY = function (t, e) {
            return this.p.Set(t, e), this
        }, b2Transform.prototype.SetRotation = function (t) {
            return this.q.Copy(t), this
        }, b2Transform.prototype.SetRotationAngle = function (t) {
            return this.q.SetAngle(t), this
        }, b2Transform.prototype.GetPosition = function () {
            return this.p
        }, b2Transform.prototype.GetRotation = function () {
            return this.q
        }, b2Transform.prototype.GetRotationAngle = function () {
            return this.q.GetAngle()
        }, b2Transform.prototype.GetAngle = function () {
            return this.q.GetAngle()
        }, b2Transform.MulXV = function (t, e, i) {
            return function (t, e, i) {
                var o = t.q.c,
                    s = t.q.s,
                    n = e.x,
                    r = e.y;
                return i.x = o * n - s * r + t.p.x, i.y = s * n + o * r + t.p.y, i
            }(t, e, i)
        }, b2Transform.MulTXV = function (t, e, i) {
            return function (t, e, i) {
                var o = t.q.c,
                    s = t.q.s,
                    n = e.x - t.p.x,
                    r = e.y - t.p.y;
                return i.x = o * n + s * r, i.y = -s * n + o * r, i
            }(t, e, i)
        }, b2Transform.MulXX = function (t, e, i) {
            return function (t, e, i) {
                return b2MulRR(t.q, e.q, i.q), b2AddVV(b2MulRV(t.q, e.p, i.p), t.p, i.p), i
            }(t, e, i)
        }, b2Transform.MulTXX = function (t, e, i) {
            return function (t, e, i) {
                return b2MulTRR(t.q, e.q, i.q), b2MulTRV(t.q, b2SubVV(e.p, t.p, i.p), i.p), i
            }(t, e, i)
        }, b2Transform.IDENTITY = new b2Transform, b2Transform
    }();
    t.b2Transform = a;
    var l = function () {
        function b2Sweep() {
            this.localCenter = new i, this.c0 = new i, this.c = new i, this.a0 = 0, this.a = 0, this.alpha0 = 0
        }
        return b2Sweep.prototype.Clone = function () {
            return (new b2Sweep).Copy(this)
        }, b2Sweep.prototype.Copy = function (t) {
            return this.localCenter.Copy(t.localCenter), this.c0.Copy(t.c0), this.c.Copy(t.c), this.a0 = t.a0, this.a = t.a, this.alpha0 = t.alpha0, this
        }, b2Sweep.prototype.GetTransform = function (t, e) {
            var o = 1 - e;
            t.p.x = o * this.c0.x + e * this.c.x, t.p.y = o * this.c0.y + e * this.c.y;
            var s = o * this.a0 + e * this.a;
            return t.q.SetAngle(s), t.p.SelfSub(b2MulRV(t.q, this.localCenter, i.s_t0)), t
        }, b2Sweep.prototype.Advance = function (t) {
            var e = (t - this.alpha0) / (1 - this.alpha0),
                i = 1 - e;
            this.c0.x = i * this.c0.x + e * this.c.x, this.c0.y = i * this.c0.y + e * this.c.y, this.a0 = i * this.a0 + e * this.a, this.alpha0 = t
        }, b2Sweep.prototype.Normalize = function () {
            var e = t.b2_two_pi * Math.floor(this.a0 / t.b2_two_pi);
            this.a0 -= e, this.a -= e
        }, b2Sweep
    }();
    t.b2Sweep = l;
    var m = function () {
        function b2Color(t, e, i, o) {
            void 0 === t && (t = .5), void 0 === e && (e = .5), void 0 === i && (i = .5), void 0 === o && (o = 1), this.r = t, this.g = e, this.b = i, this.a = o
        }
        return b2Color.prototype.Clone = function () {
            return (new b2Color).Copy(this)
        }, b2Color.prototype.Copy = function (t) {
            return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this
        }, b2Color.prototype.IsEqual = function (t) {
            return this.r === t.r && this.g === t.g && this.b === t.b && this.a === t.a
        }, b2Color.prototype.IsZero = function () {
            return 0 === this.r && 0 === this.g && 0 === this.b && 0 === this.a
        }, b2Color.prototype.GetColor = function (t) {
            return t.Copy(this), t
        }, b2Color.prototype.SetColor = function (t) {
            this.Copy(t)
        }, b2Color.prototype.Set = function (t, e, i, o) {
            void 0 === o && (o = 1), t instanceof b2Color ? this.Copy(t) : this.SetRGBA(t, e, i, o)
        }, b2Color.prototype.SetRGB = function (t, e, i) {
            return this.r = t, this.g = e, this.b = i, this
        }, b2Color.prototype.SetRGBA = function (t, e, i, o) {
            return this.r = t, this.g = e, this.b = i, this.a = o, this
        }, b2Color.prototype.SelfAdd = function (t) {
            return this.r += t.r, this.g += t.g, this.b += t.b, this.a += t.a, this
        }, b2Color.prototype.Add = function (t, e) {
            return e.r = this.r + t.r, e.g = this.g + t.g, e.b = this.b + t.b, e.a = this.a + t.a, e
        }, b2Color.prototype.SelfSub = function (t) {
            return this.r -= t.r, this.g -= t.g, this.b -= t.b, this.a -= t.a, this
        }, b2Color.prototype.Sub = function (t, e) {
            return e.r = this.r - t.r, e.g = this.g - t.g, e.b = this.b - t.b, e.a = this.a - t.a, e
        }, b2Color.prototype.SelfMul_0_1 = function (t) {
            return this.r *= t, this.g *= t, this.b *= t, this.a *= t, this
        }, b2Color.prototype.Mul_0_1 = function (t, e) {
            return e.r = this.r * t, e.g = this.g * t, e.b = this.b * t, e.a = this.a * t, this
        }, b2Color.prototype.Mix = function (t, e) {
            b2Color.MixColors(this, t, e)
        }, b2Color.MixColors = function (t, e, i) {
            var o = i * (e.r - t.r),
                s = i * (e.g - t.g),
                n = i * (e.b - t.b),
                r = i * (e.a - t.a);
            t.r += o, t.g += s, t.b += n, t.a += r, e.r -= o, e.g -= s, e.b -= n, e.a -= r
        }, b2Color.prototype.MakeStyleString = function (t) {
            return void 0 === t && (t = this.a), b2Color.MakeStyleString(this.r, this.g, this.b, t)
        }, b2Color.MakeStyleString = function (t, e, i, o) {
            return void 0 === o && (o = 1), t = Math.round(Math.max(0, Math.min(255, 255 * t))), e = Math.round(Math.max(0, Math.min(255, 255 * e))), i = Math.round(Math.max(0, Math.min(255, 255 * i))), (o = Math.max(0, Math.min(1, o))) < 1 ? "rgba(" + t + "," + e + "," + i + "," + o + ")" : "rgb(" + t + "," + e + "," + i + ")"
        }, b2Color.RED = new b2Color(1, 0, 0), b2Color.GREEN = new b2Color(0, 1, 0), b2Color.BLUE = new b2Color(0, 0, 1), b2Color
    }();
    t.b2Color = m;
    var _ = function () {
        function b2Draw() {
            this.m_drawFlags = 0
        }
        return b2Draw.prototype.SetFlags = function (t) {
            this.m_drawFlags = t
        }, b2Draw.prototype.GetFlags = function () {
            return this.m_drawFlags
        }, b2Draw.prototype.AppendFlags = function (t) {
            this.m_drawFlags |= t
        }, b2Draw.prototype.ClearFlags = function (t) {
            this.m_drawFlags &= ~t
        }, b2Draw.prototype.PushTransform = function (t) {}, b2Draw.prototype.PopTransform = function (t) {}, b2Draw.prototype.DrawPolygon = function (t, e, i) {}, b2Draw.prototype.DrawSolidPolygon = function (t, e, i) {}, b2Draw.prototype.DrawCircle = function (t, e, i) {}, b2Draw.prototype.DrawSolidCircle = function (t, e, i, o) {}, b2Draw.prototype.DrawParticles = function (t, e, i, o) {}, b2Draw.prototype.DrawSegment = function (t, e, i) {}, b2Draw.prototype.DrawTransform = function (t) {}, b2Draw
    }();
    t.b2Draw = _;
    var h = function () {
        function b2Timer() {
            this.m_start = Date.now()
        }
        return b2Timer.prototype.Reset = function () {
            return this.m_start = Date.now(), this
        }, b2Timer.prototype.GetMilliseconds = function () {
            return Date.now() - this.m_start
        }, b2Timer
    }();
    t.b2Timer = h;
    var u = function () {
        function b2Counter() {
            this.m_count = 0, this.m_min_count = 0, this.m_max_count = 0
        }
        return b2Counter.prototype.GetCount = function () {
            return this.m_count
        }, b2Counter.prototype.GetMinCount = function () {
            return this.m_min_count
        }, b2Counter.prototype.GetMaxCount = function () {
            return this.m_max_count
        }, b2Counter.prototype.ResetCount = function () {
            var t = this.m_count;
            return this.m_count = 0, t
        }, b2Counter.prototype.ResetMinCount = function () {
            this.m_min_count = 0
        }, b2Counter.prototype.ResetMaxCount = function () {
            this.m_max_count = 0
        }, b2Counter.prototype.Increment = function () {
            this.m_count++, this.m_max_count < this.m_count && (this.m_max_count = this.m_count)
        }, b2Counter.prototype.Decrement = function () {
            this.m_count--, this.m_min_count > this.m_count && (this.m_min_count = this.m_count)
        }, b2Counter
    }();
    t.b2Counter = u;
    var c = function () {
        function b2GrowableStack(t) {
            this.m_stack = [], this.m_count = 0, this.m_stack = [], this.m_count = 0
        }
        return b2GrowableStack.prototype.Reset = function () {
            return this.m_count = 0, this
        }, b2GrowableStack.prototype.Push = function (t) {
            this.m_stack[this.m_count] = t, this.m_count++
        }, b2GrowableStack.prototype.Pop = function () {
            this.m_count--;
            var t = this.m_stack[this.m_count];
            return this.m_stack[this.m_count] = null, t
        }, b2GrowableStack.prototype.GetCount = function () {
            return this.m_count
        }, b2GrowableStack
    }();
    t.b2GrowableStack = c;
    var p = function () {
        return function () {}
    }();
    t.b2BlockAllocator = p;
    var f = function () {
        return function () {}
    }();
    t.b2StackAllocator = f;
    var d = function () {
        function b2DistanceProxy() {
            this.m_buffer = i.MakeArray(2), this.m_vertices = this.m_buffer, this.m_count = 0, this.m_radius = 0
        }
        return b2DistanceProxy.prototype.Reset = function () {
            return this.m_vertices = this.m_buffer, this.m_count = 0, this.m_radius = 0, this
        }, b2DistanceProxy.prototype.SetShape = function (t, e) {
            t.SetupDistanceProxy(this, e)
        }, b2DistanceProxy.prototype.GetSupport = function (t) {
            for (var e = 0, o = i.DotVV(this.m_vertices[0], t), s = 1; s < this.m_count; ++s) {
                var n = i.DotVV(this.m_vertices[s], t);
                n > o && (e = s, o = n)
            }
            return e
        }, b2DistanceProxy.prototype.GetSupportVertex = function (t) {
            for (var e = 0, o = i.DotVV(this.m_vertices[0], t), s = 1; s < this.m_count; ++s) {
                var n = i.DotVV(this.m_vertices[s], t);
                n > o && (e = s, o = n)
            }
            return this.m_vertices[e]
        }, b2DistanceProxy.prototype.GetVertexCount = function () {
            return this.m_count
        }, b2DistanceProxy.prototype.GetVertex = function (t) {
            return this.m_vertices[t]
        }, b2DistanceProxy
    }();
    t.b2DistanceProxy = d;
    var y = function () {
        function b2SimplexCache() {
            this.metric = 0, this.count = 0, this.indexA = [0, 0, 0], this.indexB = [0, 0, 0]
        }
        return b2SimplexCache.prototype.Reset = function () {
            return this.metric = 0, this.count = 0, this
        }, b2SimplexCache
    }();
    t.b2SimplexCache = y;
    var b = function () {
        function b2DistanceInput() {
            this.proxyA = new d, this.proxyB = new d, this.transformA = new a, this.transformB = new a, this.useRadii = !1
        }
        return b2DistanceInput.prototype.Reset = function () {
            return this.proxyA.Reset(), this.proxyB.Reset(), this.transformA.SetIdentity(), this.transformB.SetIdentity(), this.useRadii = !1, this
        }, b2DistanceInput
    }();
    t.b2DistanceInput = b;
    var v = function () {
        function b2DistanceOutput() {
            this.pointA = new i, this.pointB = new i, this.distance = 0, this.iterations = 0
        }
        return b2DistanceOutput.prototype.Reset = function () {
            return this.pointA.SetZero(), this.pointB.SetZero(), this.distance = 0, this.iterations = 0, this
        }, b2DistanceOutput
    }();
    t.b2DistanceOutput = v, t.b2_gjkCalls = 0, t.b2_gjkIters = 0, t.b2_gjkMaxIters = 0;
    var S = function () {
        function b2SimplexVertex() {
            this.wA = new i, this.wB = new i, this.w = new i, this.a = 0, this.indexA = 0, this.indexB = 0
        }
        return b2SimplexVertex.prototype.Copy = function (t) {
            return this.wA.Copy(t.wA), this.wB.Copy(t.wB), this.w.Copy(t.w), this.a = t.a, this.indexA = t.indexA, this.indexB = t.indexB, this
        }, b2SimplexVertex
    }();
    t.b2SimplexVertex = S;
    var x = function () {
        function b2Simplex() {
            this.m_v1 = new S, this.m_v2 = new S, this.m_v3 = new S, this.m_vertices = [], this.m_count = 0, this.m_vertices[0] = this.m_v1, this.m_vertices[1] = this.m_v2, this.m_vertices[2] = this.m_v3
        }
        return b2Simplex.prototype.ReadCache = function (e, o, s, n, r) {
            this.m_count = e.count;
            for (var l = this.m_vertices, m = 0; m < this.m_count; ++m) {
                (p = l[m]).indexA = e.indexA[m], p.indexB = e.indexB[m];
                var _ = o.GetVertex(p.indexA),
                    h = n.GetVertex(p.indexB);
                a.MulXV(s, _, p.wA), a.MulXV(r, h, p.wB), i.SubVV(p.wB, p.wA, p.w), p.a = 0
            }
            if (this.m_count > 1) {
                var u = e.metric,
                    c = this.GetMetric();
                (c < .5 * u || 2 * u < c || c < t.b2_epsilon) && (this.m_count = 0)
            }
            if (0 === this.m_count) {
                var p;
                (p = l[0]).indexA = 0, p.indexB = 0;
                _ = o.GetVertex(0), h = n.GetVertex(0);
                a.MulXV(s, _, p.wA), a.MulXV(r, h, p.wB), i.SubVV(p.wB, p.wA, p.w), p.a = 1, this.m_count = 1
            }
        }, b2Simplex.prototype.WriteCache = function (t) {
            t.metric = this.GetMetric(), t.count = this.m_count;
            for (var e = this.m_vertices, i = 0; i < this.m_count; ++i) t.indexA[i] = e[i].indexA, t.indexB[i] = e[i].indexB
        }, b2Simplex.prototype.GetSearchDirection = function (t) {
            switch (this.m_count) {
            case 1:
                return i.NegV(this.m_v1.w, t);
            case 2:
                var e = i.SubVV(this.m_v2.w, this.m_v1.w, t);
                return i.CrossVV(e, i.NegV(this.m_v1.w, i.s_t0)) > 0 ? i.CrossOneV(e, t) : i.CrossVOne(e, t);
            default:
                return t.SetZero()
            }
        }, b2Simplex.prototype.GetClosestPoint = function (t) {
            switch (this.m_count) {
            case 0:
                return t.SetZero();
            case 1:
                return t.Copy(this.m_v1.w);
            case 2:
                return t.Set(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            case 3:
            default:
                return t.SetZero()
            }
        }, b2Simplex.prototype.GetWitnessPoints = function (t, e) {
            switch (this.m_count) {
            case 0:
                break;
            case 1:
                t.Copy(this.m_v1.wA), e.Copy(this.m_v1.wB);
                break;
            case 2:
                t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x, t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y, e.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x, e.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                e.x = t.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x, e.y = t.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y
            }
        }, b2Simplex.prototype.GetMetric = function () {
            switch (this.m_count) {
            case 0:
            case 1:
                return 0;
            case 2:
                return i.DistanceVV(this.m_v1.w, this.m_v2.w);
            case 3:
                return i.CrossVV(i.SubVV(this.m_v2.w, this.m_v1.w, i.s_t0), i.SubVV(this.m_v3.w, this.m_v1.w, i.s_t1));
            default:
                return 0
            }
        }, b2Simplex.prototype.Solve2 = function () {
            var t = this.m_v1.w,
                e = this.m_v2.w,
                o = i.SubVV(e, t, b2Simplex.s_e12),
                s = -i.DotVV(t, o);
            if (s <= 0) return this.m_v1.a = 1, void(this.m_count = 1);
            var n = i.DotVV(e, o);
            if (n <= 0) return this.m_v2.a = 1, this.m_count = 1, void this.m_v1.Copy(this.m_v2);
            var r = 1 / (n + s);
            this.m_v1.a = n * r, this.m_v2.a = s * r, this.m_count = 2
        }, b2Simplex.prototype.Solve3 = function () {
            var t = this.m_v1.w,
                e = this.m_v2.w,
                o = this.m_v3.w,
                s = i.SubVV(e, t, b2Simplex.s_e12),
                n = i.DotVV(t, s),
                r = i.DotVV(e, s),
                a = -n,
                l = i.SubVV(o, t, b2Simplex.s_e13),
                m = i.DotVV(t, l),
                _ = i.DotVV(o, l),
                h = -m,
                u = i.SubVV(o, e, b2Simplex.s_e23),
                c = i.DotVV(e, u),
                p = i.DotVV(o, u),
                f = -c,
                d = i.CrossVV(s, l),
                y = d * i.CrossVV(e, o),
                b = d * i.CrossVV(o, t),
                v = d * i.CrossVV(t, e);
            if (a <= 0 && h <= 0) return this.m_v1.a = 1, void(this.m_count = 1);
            if (r > 0 && a > 0 && v <= 0) {
                var S = 1 / (r + a);
                return this.m_v1.a = r * S, this.m_v2.a = a * S, void(this.m_count = 2)
            }
            if (_ > 0 && h > 0 && b <= 0) {
                var x = 1 / (_ + h);
                return this.m_v1.a = _ * x, this.m_v3.a = h * x, this.m_count = 2, void this.m_v2.Copy(this.m_v3)
            }
            if (r <= 0 && f <= 0) return this.m_v2.a = 1, this.m_count = 1, void this.m_v1.Copy(this.m_v2);
            if (_ <= 0 && p <= 0) return this.m_v3.a = 1, this.m_count = 1, void this.m_v1.Copy(this.m_v3);
            if (p > 0 && f > 0 && y <= 0) {
                var C = 1 / (p + f);
                return this.m_v2.a = p * C, this.m_v3.a = f * C, this.m_count = 2, void this.m_v1.Copy(this.m_v3)
            }
            var A = 1 / (y + b + v);
            this.m_v1.a = y * A, this.m_v2.a = b * A, this.m_v3.a = v * A, this.m_count = 3
        }, b2Simplex.s_e12 = new i, b2Simplex.s_e13 = new i, b2Simplex.s_e23 = new i, b2Simplex
    }();
    t.b2Simplex = x;
    var C = new x,
        A = [0, 0, 0],
        B = [0, 0, 0],
        V = new i,
        g = new i,
        P = new i,
        w = new i,
        M = new i;

    function b2Distance(e, o, s) {
        ++t.b2_gjkCalls;
        var n = s.proxyA,
            l = s.proxyB,
            m = s.transformA,
            _ = s.transformB,
            h = C;
        h.ReadCache(o, n, m, l, _);
        for (var u = h.m_vertices, c = A, p = B, f = 0, d = (t.b2_maxFloat, 0); d < 20;) {
            f = h.m_count;
            for (var y = 0; y < f; ++y) c[y] = u[y].indexA, p[y] = u[y].indexB;
            switch (h.m_count) {
            case 1:
                break;
            case 2:
                h.Solve2();
                break;
            case 3:
                h.Solve3()
            }
            if (3 === h.m_count) break;
            (G = h.GetClosestPoint(V)).LengthSquared();
            var b = h.GetSearchDirection(g);
            if (b.LengthSquared() < t.b2_epsilon_sq) break;
            var v = u[h.m_count];
            v.indexA = n.GetSupport(r.MulTRV(m.q, i.NegV(b, i.s_t0), w)), a.MulXV(m, n.GetVertex(v.indexA), v.wA), v.indexB = l.GetSupport(r.MulTRV(_.q, b, M)), a.MulXV(_, l.GetVertex(v.indexB), v.wB), i.SubVV(v.wB, v.wA, v.w), ++d, ++t.b2_gjkIters;
            var S = !1;
            for (y = 0; y < f; ++y)
                if (v.indexA === c[y] && v.indexB === p[y]) {
                    S = !0;
                    break
                }
            if (S) break;
            ++h.m_count
        }
        if (t.b2_gjkMaxIters = b2Max(t.b2_gjkMaxIters, d), h.GetWitnessPoints(e.pointA, e.pointB), e.distance = i.DistanceVV(e.pointA, e.pointB), e.iterations = d, h.WriteCache(o), s.useRadii) {
            var x = n.m_radius,
                I = l.m_radius;
            if (e.distance > x + I && e.distance > t.b2_epsilon) {
                e.distance -= x + I;
                var D = i.SubVV(e.pointB, e.pointA, P);
                D.Normalize(), e.pointA.SelfMulAdd(x, D), e.pointB.SelfMulSub(I, D)
            } else {
                var G = i.MidVV(e.pointA, e.pointB, V);
                e.pointA.Copy(G), e.pointB.Copy(G), e.distance = 0
            }
        }
    }
    t.b2Distance = b2Distance;
    var I = function () {
        return function () {
            this.mass = 0, this.center = new i(0, 0), this.I = 0
        }
    }();
    t.b2MassData = I;
    var D = function () {
        function b2Shape(t, e) {
            this.m_type = -1, this.m_radius = 0, this.m_type = t, this.m_radius = e
        }
        return b2Shape.prototype.Copy = function (t) {
            return this.m_radius = t.m_radius, this
        }, b2Shape.prototype.GetType = function () {
            return this.m_type
        }, b2Shape
    }();
    t.b2Shape = D;
    var G = function () {
        function b2ContactFeature() {
            this._key = 0, this._key_invalid = !1, this._indexA = 0, this._indexB = 0, this._typeA = 0, this._typeB = 0
        }
        return Object.defineProperty(b2ContactFeature.prototype, "key", {
            get: function () {
                return this._key_invalid && (this._key_invalid = !1, this._key = this._indexA | this._indexB << 8 | this._typeA << 16 | this._typeB << 24), this._key
            }, set: function (t) {
                this._key = t, this._key_invalid = !1, this._indexA = 255 & this._key, this._indexB = this._key >> 8 & 255, this._typeA = this._key >> 16 & 255, this._typeB = this._key >> 24 & 255
            }, enumerable: !0,
            configurable: !0
        }), Object.defineProperty(b2ContactFeature.prototype, "indexA", {
            get: function () {
                return this._indexA
            }, set: function (t) {
                this._indexA = t, this._key_invalid = !0
            }, enumerable: !0,
            configurable: !0
        }), Object.defineProperty(b2ContactFeature.prototype, "indexB", {
            get: function () {
                return this._indexB
            }, set: function (t) {
                this._indexB = t, this._key_invalid = !0
            }, enumerable: !0,
            configurable: !0
        }), Object.defineProperty(b2ContactFeature.prototype, "typeA", {
            get: function () {
                return this._typeA
            }, set: function (t) {
                this._typeA = t, this._key_invalid = !0
            }, enumerable: !0,
            configurable: !0
        }), Object.defineProperty(b2ContactFeature.prototype, "typeB", {
            get: function () {
                return this._typeB
            }, set: function (t) {
                this._typeB = t, this._key_invalid = !0
            }, enumerable: !0,
            configurable: !0
        }), b2ContactFeature
    }();
    t.b2ContactFeature = G;
    var F = function () {
        function b2ContactID() {
            this.cf = new G
        }
        return b2ContactID.prototype.Copy = function (t) {
            return this.key = t.key, this
        }, b2ContactID.prototype.Clone = function () {
            return (new b2ContactID).Copy(this)
        }, Object.defineProperty(b2ContactID.prototype, "key", {
            get: function () {
                return this.cf.key
            }, set: function (t) {
                this.cf.key = t
            }, enumerable: !0,
            configurable: !0
        }), b2ContactID
    }();
    t.b2ContactID = F;
    var R = function () {
        function b2ManifoldPoint() {
            this.localPoint = new i, this.normalImpulse = 0, this.tangentImpulse = 0, this.id = new F
        }
        return b2ManifoldPoint.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2ManifoldPoint
            })
        }, b2ManifoldPoint.prototype.Reset = function () {
            this.localPoint.SetZero(), this.normalImpulse = 0, this.tangentImpulse = 0, this.id.key = 0
        }, b2ManifoldPoint.prototype.Copy = function (t) {
            return this.localPoint.Copy(t.localPoint), this.normalImpulse = t.normalImpulse, this.tangentImpulse = t.tangentImpulse, this.id.Copy(t.id), this
        }, b2ManifoldPoint
    }();
    t.b2ManifoldPoint = R;
    var J = function () {
        function b2Manifold() {
            this.points = R.MakeArray(t.b2_maxManifoldPoints), this.localNormal = new i, this.localPoint = new i, this.type = -1, this.pointCount = 0
        }
        return b2Manifold.prototype.Reset = function () {
            for (var e = 0; e < t.b2_maxManifoldPoints; ++e) this.points[e].Reset();
            this.localNormal.SetZero(), this.localPoint.SetZero(), this.type = -1, this.pointCount = 0
        }, b2Manifold.prototype.Copy = function (e) {
            this.pointCount = e.pointCount;
            for (var i = 0; i < t.b2_maxManifoldPoints; ++i) this.points[i].Copy(e.points[i]);
            return this.localNormal.Copy(e.localNormal), this.localPoint.Copy(e.localPoint), this.type = e.type, this
        }, b2Manifold.prototype.Clone = function () {
            return (new b2Manifold).Copy(this)
        }, b2Manifold
    }();
    t.b2Manifold = J;
    var T = function () {
        function b2WorldManifold() {
            this.normal = new i, this.points = i.MakeArray(t.b2_maxManifoldPoints), this.separations = b2MakeNumberArray(t.b2_maxManifoldPoints)
        }
        return b2WorldManifold.prototype.Initialize = function (e, o, s, n, l) {
            if (0 !== e.pointCount) switch (e.type) {
            case 0:
                this.normal.Set(1, 0);
                var m = a.MulXV(o, e.localPoint, b2WorldManifold.Initialize_s_pointA),
                    _ = a.MulXV(n, e.points[0].localPoint, b2WorldManifold.Initialize_s_pointB);
                i.DistanceSquaredVV(m, _) > t.b2_epsilon_sq && i.SubVV(_, m, this.normal).SelfNormalize();
                var h = i.AddVMulSV(m, s, this.normal, b2WorldManifold.Initialize_s_cA),
                    u = i.SubVMulSV(_, l, this.normal, b2WorldManifold.Initialize_s_cB);
                i.MidVV(h, u, this.points[0]), this.separations[0] = i.DotVV(i.SubVV(u, h, i.s_t0), this.normal);
                break;
            case 1:
                r.MulRV(o.q, e.localNormal, this.normal);
                for (var c = a.MulXV(o, e.localPoint, b2WorldManifold.Initialize_s_planePoint), p = 0; p < e.pointCount; ++p) {
                    var f = a.MulXV(n, e.points[p].localPoint, b2WorldManifold.Initialize_s_clipPoint),
                        d = s - i.DotVV(i.SubVV(f, c, i.s_t0), this.normal);
                    h = i.AddVMulSV(f, d, this.normal, b2WorldManifold.Initialize_s_cA), u = i.SubVMulSV(f, l, this.normal, b2WorldManifold.Initialize_s_cB);
                    i.MidVV(h, u, this.points[p]), this.separations[p] = i.DotVV(i.SubVV(u, h, i.s_t0), this.normal)
                }
                break;
            case 2:
                r.MulRV(n.q, e.localNormal, this.normal);
                for (c = a.MulXV(n, e.localPoint, b2WorldManifold.Initialize_s_planePoint), p = 0; p < e.pointCount; ++p) {
                    f = a.MulXV(o, e.points[p].localPoint, b2WorldManifold.Initialize_s_clipPoint), d = l - i.DotVV(i.SubVV(f, c, i.s_t0), this.normal), u = i.AddVMulSV(f, d, this.normal, b2WorldManifold.Initialize_s_cB), h = i.SubVMulSV(f, s, this.normal, b2WorldManifold.Initialize_s_cA);
                    i.MidVV(h, u, this.points[p]), this.separations[p] = i.DotVV(i.SubVV(h, u, i.s_t0), this.normal)
                }
                this.normal.SelfNeg()
            }
        }, b2WorldManifold.Initialize_s_pointA = new i, b2WorldManifold.Initialize_s_pointB = new i, b2WorldManifold.Initialize_s_cA = new i, b2WorldManifold.Initialize_s_cB = new i, b2WorldManifold.Initialize_s_planePoint = new i, b2WorldManifold.Initialize_s_clipPoint = new i, b2WorldManifold
    }();
    t.b2WorldManifold = T, t.b2GetPointStates = function (e, i, o, s) {
        var n;
        for (n = 0; n < o.pointCount; ++n) {
            var r = o.points[n].id.key;
            e[n] = 3;
            for (var a = 0, l = s.pointCount; a < l; ++a)
                if (s.points[a].id.key === r) {
                    e[n] = 2;
                    break
                }
        }
        for (; n < t.b2_maxManifoldPoints; ++n) e[n] = 0;
        for (n = 0; n < s.pointCount; ++n)
            for (r = s.points[n].id.key, i[n] = 1, a = 0, l = o.pointCount; a < l; ++a)
                if (o.points[a].id.key === r) {
                    i[n] = 2;
                    break
                }
        for (; n < t.b2_maxManifoldPoints; ++n) i[n] = 0
    };
    var L = function () {
        function b2ClipVertex() {
            this.v = new i, this.id = new F
        }
        return b2ClipVertex.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2ClipVertex
            })
        }, b2ClipVertex.prototype.Copy = function (t) {
            return this.v.Copy(t.v), this.id.Copy(t.id), this
        }, b2ClipVertex
    }();
    t.b2ClipVertex = L;
    var k = function () {
        function b2RayCastInput() {
            this.p1 = new i, this.p2 = new i, this.maxFraction = 1
        }
        return b2RayCastInput.prototype.Copy = function (t) {
            return this.p1.Copy(t.p1), this.p2.Copy(t.p2), this.maxFraction = t.maxFraction, this
        }, b2RayCastInput
    }();
    t.b2RayCastInput = k;
    var q = function () {
        function b2RayCastOutput() {
            this.normal = new i, this.fraction = 0
        }
        return b2RayCastOutput.prototype.Copy = function (t) {
            return this.normal.Copy(t.normal), this.fraction = t.fraction, this
        }, b2RayCastOutput
    }();
    t.b2RayCastOutput = q;
    var z = function () {
        function b2AABB() {
            this.lowerBound = new i, this.upperBound = new i, this.m_cache_center = new i, this.m_cache_extent = new i
        }
        return b2AABB.prototype.Copy = function (t) {
            return this.lowerBound.Copy(t.lowerBound), this.upperBound.Copy(t.upperBound), this
        }, b2AABB.prototype.IsValid = function () {
            var t = this.upperBound.x - this.lowerBound.x,
                e = this.upperBound.y - this.lowerBound.y,
                i = t >= 0 && e >= 0;
            return i = i && this.lowerBound.IsValid() && this.upperBound.IsValid()
        }, b2AABB.prototype.GetCenter = function () {
            return i.MidVV(this.lowerBound, this.upperBound, this.m_cache_center)
        }, b2AABB.prototype.GetExtents = function () {
            return i.ExtVV(this.lowerBound, this.upperBound, this.m_cache_extent)
        }, b2AABB.prototype.GetPerimeter = function () {
            return 2 * (this.upperBound.x - this.lowerBound.x + (this.upperBound.y - this.lowerBound.y))
        }, b2AABB.prototype.Combine1 = function (t) {
            return this.lowerBound.x = b2Min(this.lowerBound.x, t.lowerBound.x), this.lowerBound.y = b2Min(this.lowerBound.y, t.lowerBound.y), this.upperBound.x = b2Max(this.upperBound.x, t.upperBound.x), this.upperBound.y = b2Max(this.upperBound.y, t.upperBound.y), this
        }, b2AABB.prototype.Combine2 = function (t, e) {
            return this.lowerBound.x = b2Min(t.lowerBound.x, e.lowerBound.x), this.lowerBound.y = b2Min(t.lowerBound.y, e.lowerBound.y), this.upperBound.x = b2Max(t.upperBound.x, e.upperBound.x), this.upperBound.y = b2Max(t.upperBound.y, e.upperBound.y), this
        }, b2AABB.Combine = function (t, e, i) {
            return i.Combine2(t, e), i
        }, b2AABB.prototype.Contains = function (t) {
            var e = !0;
            return e = (e = (e = (e = e && this.lowerBound.x <= t.lowerBound.x) && this.lowerBound.y <= t.lowerBound.y) && t.upperBound.x <= this.upperBound.x) && t.upperBound.y <= this.upperBound.y
        }, b2AABB.prototype.RayCast = function (e, i) {
            var o = -t.b2_maxFloat,
                s = t.b2_maxFloat,
                n = i.p1.x,
                r = i.p1.y,
                a = i.p2.x - i.p1.x,
                l = i.p2.y - i.p1.y,
                m = b2Abs(a),
                _ = b2Abs(l),
                h = e.normal;
            if (m < t.b2_epsilon) {
                if (n < this.lowerBound.x || this.upperBound.x < n) return !1
            } else {
                var u = 1 / a,
                    c = -1;
                if ((f = (this.lowerBound.x - n) * u) > (d = (this.upperBound.x - n) * u)) {
                    var p = f;
                    f = d, d = p, c = 1
                }
                if (f > o && (h.x = c, h.y = 0, o = f), o > (s = b2Min(s, d))) return !1
            } if (_ < t.b2_epsilon) {
                if (r < this.lowerBound.y || this.upperBound.y < r) return !1
            } else {
                var f, d;
                u = 1 / l, c = -1;
                if ((f = (this.lowerBound.y - r) * u) > (d = (this.upperBound.y - r) * u)) {
                    p = f;
                    f = d, d = p, c = 1
                }
                if (f > o && (h.x = 0, h.y = c, o = f), o > (s = b2Min(s, d))) return !1
            }
            return !(o < 0 || i.maxFraction < o) && (e.fraction = o, !0)
        }, b2AABB.prototype.TestOverlap = function (t) {
            var e = t.lowerBound.x - this.upperBound.x,
                i = t.lowerBound.y - this.upperBound.y,
                o = this.lowerBound.x - t.upperBound.x,
                s = this.lowerBound.y - t.upperBound.y;
            return !(e > 0 || i > 0) && !(o > 0 || s > 0)
        }, b2AABB
    }();

    function b2TestOverlapAABB(t, e) {
        if (!t || !e) return !0;
        var i = e.lowerBound.x - t.upperBound.x,
            o = e.lowerBound.y - t.upperBound.y,
            s = t.lowerBound.x - e.upperBound.x,
            n = t.lowerBound.y - e.upperBound.y;
        return !(i > 0 || o > 0) && !(s > 0 || n > 0)
    }

    function b2ClipSegmentToLine(t, e, o, s, n) {
        var r = 0,
            a = e[0],
            l = e[1],
            m = i.DotVV(o, a.v) - s,
            _ = i.DotVV(o, l.v) - s;
        if (m <= 0 && t[r++].Copy(a), _ <= 0 && t[r++].Copy(l), m * _ < 0) {
            var h = m / (m - _),
                u = t[r].v;
            u.x = a.v.x + h * (l.v.x - a.v.x), u.y = a.v.y + h * (l.v.y - a.v.y);
            var c = t[r].id;
            c.cf.indexA = n, c.cf.indexB = a.id.cf.indexB, c.cf.typeA = 0, c.cf.typeB = 1, ++r
        }
        return r
    }
    t.b2AABB = z, t.b2TestOverlapAABB = b2TestOverlapAABB, t.b2ClipSegmentToLine = b2ClipSegmentToLine;
    var W = new b,
        E = new y,
        j = new v;

    function b2TestOverlapShape(e, i, o, s, n, r) {
        var a = W.Reset();
        a.proxyA.SetShape(e, i), a.proxyB.SetShape(o, s), a.transformA.Copy(n), a.transformB.Copy(r), a.useRadii = !0;
        var l = E.Reset();
        l.count = 0;
        var m = j.Reset();
        return b2Distance(m, l, a), m.distance < 10 * t.b2_epsilon
    }
    t.b2TestOverlapShape = b2TestOverlapShape;
    var N = function () {
        function b2TreeNode(t) {
            void 0 === t && (t = 0), this.m_id = 0, this.aabb = new z, this.userData = null, this.parent = null, this.child1 = null, this.child2 = null, this.height = 0, this.m_id = t
        }
        return b2TreeNode.prototype.IsLeaf = function () {
            return null === this.child1
        }, b2TreeNode
    }();
    t.b2TreeNode = N;
    var O = function () {
        function b2DynamicTree() {
            this.m_root = null, this.m_freeList = null, this.m_path = 0, this.m_insertionCount = 0
        }
        return b2DynamicTree.prototype.GetUserData = function (t) {
            return t.userData
        }, b2DynamicTree.prototype.GetFatAABB = function (t) {
            return t ? t.aabb : null
        }, b2DynamicTree.prototype.Query = function (t, e) {
            if (null !== this.m_root) {
                var i = b2DynamicTree.s_stack.Reset();
                for (i.Push(this.m_root); i.GetCount() > 0;) {
                    var o = i.Pop();
                    if (null !== o)
                        if (o.aabb.TestOverlap(e))
                            if (o.IsLeaf()) {
                                if (!t(o)) return
                            } else i.Push(o.child1), i.Push(o.child2)
                }
            }
        }, b2DynamicTree.prototype.RayCast = function (t, e) {
            if (null !== this.m_root) {
                var o = e.p1,
                    s = e.p2,
                    n = i.SubVV(s, o, b2DynamicTree.s_r);
                n.Normalize();
                var r = i.CrossOneV(n, b2DynamicTree.s_v),
                    a = i.AbsV(r, b2DynamicTree.s_abs_v),
                    l = e.maxFraction,
                    m = b2DynamicTree.s_segmentAABB,
                    _ = o.x + l * (s.x - o.x),
                    h = o.y + l * (s.y - o.y);
                m.lowerBound.x = b2Min(o.x, _), m.lowerBound.y = b2Min(o.y, h), m.upperBound.x = b2Max(o.x, _), m.upperBound.y = b2Max(o.y, h);
                var u = b2DynamicTree.s_stack.Reset();
                for (u.Push(this.m_root); u.GetCount() > 0;) {
                    var c = u.Pop();
                    if (null !== c && b2TestOverlapAABB(c.aabb, m)) {
                        var p = c.aabb.GetCenter(),
                            f = c.aabb.GetExtents();
                        if (!(b2Abs(i.DotVV(r, i.SubVV(o, p, i.s_t0))) - i.DotVV(a, f) > 0))
                            if (c.IsLeaf()) {
                                var d = b2DynamicTree.s_subInput;
                                d.p1.Copy(e.p1), d.p2.Copy(e.p2), d.maxFraction = l;
                                var y = t(d, c);
                                if (0 === y) return;
                                y > 0 && (l = y, _ = o.x + l * (s.x - o.x), h = o.y + l * (s.y - o.y), m.lowerBound.x = b2Min(o.x, _), m.lowerBound.y = b2Min(o.y, h), m.upperBound.x = b2Max(o.x, _), m.upperBound.y = b2Max(o.y, h))
                            } else u.Push(c.child1), u.Push(c.child2)
                    }
                }
            }
        }, b2DynamicTree.prototype.AllocateNode = function () {
            if (this.m_freeList) {
                var t = this.m_freeList;
                return this.m_freeList = t.parent, t.parent = null, t.child1 = null, t.child2 = null, t.height = 0, t.userData = null, t
            }
            return new N(b2DynamicTree.s_node_id++)
        }, b2DynamicTree.prototype.FreeNode = function (t) {
            t.parent = this.m_freeList, t.height = -1, this.m_freeList = t
        }, b2DynamicTree.prototype.CreateProxy = function (e, i) {
            var o = this.AllocateNode(),
                s = t.b2_aabbExtension,
                n = t.b2_aabbExtension;
            return o.aabb.lowerBound.x = e.lowerBound.x - s, o.aabb.lowerBound.y = e.lowerBound.y - n, o.aabb.upperBound.x = e.upperBound.x + s, o.aabb.upperBound.y = e.upperBound.y + n, o.userData = i, o.height = 0, this.InsertLeaf(o), o
        }, b2DynamicTree.prototype.DestroyProxy = function (t) {
            this.RemoveLeaf(t), this.FreeNode(t)
        }, b2DynamicTree.prototype.MoveProxy = function (e, i, o) {
            if (e.aabb.Contains(i)) return !1;
            this.RemoveLeaf(e);
            var s = t.b2_aabbExtension + t.b2_aabbMultiplier * (o.x > 0 ? o.x : -o.x),
                n = t.b2_aabbExtension + t.b2_aabbMultiplier * (o.y > 0 ? o.y : -o.y);
            return e.aabb.lowerBound.x = i.lowerBound.x - s, e.aabb.lowerBound.y = i.lowerBound.y - n, e.aabb.upperBound.x = i.upperBound.x + s, e.aabb.upperBound.y = i.upperBound.y + n, this.InsertLeaf(e), !0
        }, b2DynamicTree.prototype.InsertLeaf = function (t) {
            if (++this.m_insertionCount, null === this.m_root) return this.m_root = t, void(this.m_root.parent = null);
            for (var e, i, o = t.aabb, s = this.m_root; !s.IsLeaf();) {
                e = s.child1, i = s.child2;
                var n = s.aabb.GetPerimeter(),
                    r = b2DynamicTree.s_combinedAABB;
                r.Combine2(s.aabb, o);
                var a = r.GetPerimeter(),
                    l = 2 * a,
                    m = 2 * (a - n),
                    _ = void 0,
                    h = b2DynamicTree.s_aabb,
                    u = void 0;
                e.IsLeaf() ? (h.Combine2(o, e.aabb), _ = h.GetPerimeter() + m) : (h.Combine2(o, e.aabb), u = e.aabb.GetPerimeter(), _ = h.GetPerimeter() - u + m);
                var c = void 0;
                if (i.IsLeaf() ? (h.Combine2(o, i.aabb), c = h.GetPerimeter() + m) : (h.Combine2(o, i.aabb), u = i.aabb.GetPerimeter(), c = h.GetPerimeter() - u + m), l < _ && l < c) break;
                s = _ < c ? e : i
            }
            var p = s,
                f = p.parent,
                d = this.AllocateNode();
            for (d.parent = f, d.userData = null, d.aabb.Combine2(o, p.aabb), d.height = p.height + 1, f ? (f.child1 === p ? f.child1 = d : f.child2 = d, d.child1 = p, d.child2 = t, p.parent = d, t.parent = d) : (d.child1 = p, d.child2 = t, p.parent = d, t.parent = d, this.m_root = d), s = t.parent; null !== s;) e = (s = this.Balance(s)).child1, i = s.child2, s.height = 1 + b2Max(e.height, i.height), s.aabb.Combine2(e.aabb, i.aabb), s = s.parent
        }, b2DynamicTree.prototype.RemoveLeaf = function (t) {
            if (t !== this.m_root) {
                var e, i = t.parent,
                    o = i.parent;
                if (e = i.child1 === t ? i.child2 : i.child1, o) {
                    o.child1 === i ? o.child1 = e : o.child2 = e, e.parent = o, this.FreeNode(i);
                    for (var s = o; s;) {
                        var n = (s = this.Balance(s)).child1,
                            r = s.child2;
                        s.aabb.Combine2(n.aabb, r.aabb), s.height = 1 + b2Max(n.height, r.height), s = s.parent
                    }
                } else this.m_root = e, e.parent = null, this.FreeNode(i)
            } else this.m_root = null
        }, b2DynamicTree.prototype.Balance = function (t) {
            if (t.IsLeaf() || t.height < 2) return t;
            var e = t.child1,
                i = t.child2,
                o = i.height - e.height;
            if (o > 1) {
                var s = i.child1,
                    n = i.child2;
                return i.child1 = t, i.parent = t.parent, t.parent = i, null !== i.parent ? i.parent.child1 === t ? i.parent.child1 = i : i.parent.child2 = i : this.m_root = i, s.height > n.height ? (i.child2 = s, t.child2 = n, n.parent = t, t.aabb.Combine2(e.aabb, n.aabb), i.aabb.Combine2(t.aabb, s.aabb), t.height = 1 + b2Max(e.height, n.height), i.height = 1 + b2Max(t.height, s.height)) : (i.child2 = n, t.child2 = s, s.parent = t, t.aabb.Combine2(e.aabb, s.aabb), i.aabb.Combine2(t.aabb, n.aabb), t.height = 1 + b2Max(e.height, s.height), i.height = 1 + b2Max(t.height, n.height)), i
            }
            if (o < -1) {
                var r = e.child1,
                    a = e.child2;
                return e.child1 = t, e.parent = t.parent, t.parent = e, null !== e.parent ? e.parent.child1 === t ? e.parent.child1 = e : e.parent.child2 = e : this.m_root = e, r.height > a.height ? (e.child2 = r, t.child1 = a, a.parent = t, t.aabb.Combine2(i.aabb, a.aabb), e.aabb.Combine2(t.aabb, r.aabb), t.height = 1 + b2Max(i.height, a.height), e.height = 1 + b2Max(t.height, r.height)) : (e.child2 = a, t.child1 = r, r.parent = t, t.aabb.Combine2(i.aabb, r.aabb), e.aabb.Combine2(t.aabb, a.aabb), t.height = 1 + b2Max(i.height, r.height), e.height = 1 + b2Max(t.height, a.height)), e
            }
            return t
        }, b2DynamicTree.prototype.GetHeight = function () {
            return null === this.m_root ? 0 : this.m_root.height
        }, b2DynamicTree.GetAreaNode = function (t) {
            if (null === t) return 0;
            if (t.IsLeaf()) return 0;
            var e = t.aabb.GetPerimeter();
            return e += b2DynamicTree.GetAreaNode(t.child1), e += b2DynamicTree.GetAreaNode(t.child2)
        }, b2DynamicTree.prototype.GetAreaRatio = function () {
            if (null === this.m_root) return 0;
            var t = this.m_root.aabb.GetPerimeter();
            return b2DynamicTree.GetAreaNode(this.m_root) / t
        }, b2DynamicTree.prototype.ComputeHeightNode = function (t) {
            return t.IsLeaf() ? 0 : 1 + b2Max(this.ComputeHeightNode(t.child1), this.ComputeHeightNode(t.child2))
        }, b2DynamicTree.prototype.ComputeHeight = function () {
            return this.ComputeHeightNode(this.m_root)
        }, b2DynamicTree.prototype.ValidateStructure = function (t) {
            if (null !== t) {
                this.m_root;
                var e = t,
                    i = e.child1,
                    o = e.child2;
                e.IsLeaf() || (this.ValidateStructure(i), this.ValidateStructure(o))
            }
        }, b2DynamicTree.prototype.ValidateMetrics = function (t) {
            if (null !== t) {
                var e = t,
                    i = e.child1,
                    o = e.child2;
                if (!e.IsLeaf()) b2DynamicTree.s_aabb.Combine2(i.aabb, o.aabb), this.ValidateMetrics(i), this.ValidateMetrics(o)
            }
        }, b2DynamicTree.prototype.Validate = function () {
            this.ValidateStructure(this.m_root), this.ValidateMetrics(this.m_root);
            for (var t = this.m_freeList; null !== t;) t = t.parent, 0
        }, b2DynamicTree.GetMaxBalanceNode = function (t, e) {
            if (null === t) return e;
            if (t.height <= 1) return e;
            var i = t.child1;
            return b2Max(e, b2Abs(t.child2.height - i.height))
        }, b2DynamicTree.prototype.GetMaxBalance = function () {
            return b2DynamicTree.GetMaxBalanceNode(this.m_root, 0)
        }, b2DynamicTree.prototype.RebuildBottomUp = function () {
            this.Validate()
        }, b2DynamicTree.ShiftOriginNode = function (t, e) {
            if (null !== t && !(t.height <= 1)) {
                var i = t.child1,
                    o = t.child2;
                b2DynamicTree.ShiftOriginNode(i, e), b2DynamicTree.ShiftOriginNode(o, e), t.aabb.lowerBound.SelfSub(e), t.aabb.upperBound.SelfSub(e)
            }
        }, b2DynamicTree.prototype.ShiftOrigin = function (t) {
            b2DynamicTree.ShiftOriginNode(this.m_root, t)
        }, b2DynamicTree.s_stack = new c(256), b2DynamicTree.s_r = new i, b2DynamicTree.s_v = new i, b2DynamicTree.s_abs_v = new i, b2DynamicTree.s_segmentAABB = new z, b2DynamicTree.s_subInput = new k, b2DynamicTree.s_combinedAABB = new z, b2DynamicTree.s_aabb = new z, b2DynamicTree.s_node_id = 0, b2DynamicTree
    }();
    t.b2DynamicTree = O, t.b2_toiTime = 0, t.b2_toiMaxTime = 0, t.b2_toiCalls = 0, t.b2_toiIters = 0, t.b2_toiMaxIters = 0, t.b2_toiRootIters = 0, t.b2_toiMaxRootIters = 0;
    var X = new a,
        U = new a,
        Z = new i,
        H = new i,
        Q = new i,
        Y = new i,
        K = new i,
        $ = function () {
            return function () {
                this.proxyA = new d, this.proxyB = new d, this.sweepA = new l, this.sweepB = new l, this.tMax = 0
            }
        }();
    t.b2TOIInput = $;
    var tt = function () {
        return function () {
            this.state = 0, this.t = 0
        }
    }();
    t.b2TOIOutput = tt;
    var et = function () {
        function b2SeparationFunction() {
            this.m_sweepA = new l, this.m_sweepB = new l, this.m_type = -1, this.m_localPoint = new i, this.m_axis = new i
        }
        return b2SeparationFunction.prototype.Initialize = function (t, e, o, s, n, l) {
            this.m_proxyA = e, this.m_proxyB = s;
            var m = t.count;
            this.m_sweepA.Copy(o), this.m_sweepB.Copy(n);
            var _ = X,
                h = U;
            if (this.m_sweepA.GetTransform(_, l), this.m_sweepB.GetTransform(h, l), 1 === m) {
                this.m_type = 0;
                var u = this.m_proxyA.GetVertex(t.indexA[0]),
                    c = this.m_proxyB.GetVertex(t.indexB[0]),
                    p = a.MulXV(_, u, Z),
                    f = a.MulXV(h, c, H);
                i.SubVV(f, p, this.m_axis);
                var d = this.m_axis.Normalize();
                return this.m_localPoint.SetZero(), d
            }
            if (t.indexA[0] === t.indexA[1]) {
                this.m_type = 2;
                var y = this.m_proxyB.GetVertex(t.indexB[0]),
                    b = this.m_proxyB.GetVertex(t.indexB[1]);
                i.CrossVOne(i.SubVV(b, y, i.s_t0), this.m_axis).SelfNormalize();
                var v = r.MulRV(h.q, this.m_axis, Q);
                i.MidVV(y, b, this.m_localPoint);
                f = a.MulXV(h, this.m_localPoint, H), u = this.m_proxyA.GetVertex(t.indexA[0]), p = a.MulXV(_, u, Z);
                return (d = i.DotVV(i.SubVV(p, f, i.s_t0), v)) < 0 && (this.m_axis.SelfNeg(), d = -d), d
            }
            this.m_type = 1;
            var S = this.m_proxyA.GetVertex(t.indexA[0]),
                x = this.m_proxyA.GetVertex(t.indexA[1]);
            i.CrossVOne(i.SubVV(x, S, i.s_t0), this.m_axis).SelfNormalize();
            v = r.MulRV(_.q, this.m_axis, Q);
            i.MidVV(S, x, this.m_localPoint);
            p = a.MulXV(_, this.m_localPoint, Z), c = this.m_proxyB.GetVertex(t.indexB[0]), f = a.MulXV(h, c, H);
            return (d = i.DotVV(i.SubVV(f, p, i.s_t0), v)) < 0 && (this.m_axis.SelfNeg(), d = -d), d
        }, b2SeparationFunction.prototype.FindMinSeparation = function (t, e, o) {
            var s = X,
                n = U;
            switch (this.m_sweepA.GetTransform(s, o), this.m_sweepB.GetTransform(n, o), this.m_type) {
            case 0:
                var l = r.MulTRV(s.q, this.m_axis, Y),
                    m = r.MulTRV(n.q, i.NegV(this.m_axis, i.s_t0), K);
                t[0] = this.m_proxyA.GetSupport(l), e[0] = this.m_proxyB.GetSupport(m);
                var _ = this.m_proxyA.GetVertex(t[0]),
                    h = this.m_proxyB.GetVertex(e[0]),
                    u = a.MulXV(s, _, Z),
                    c = a.MulXV(n, h, H);
                return i.DotVV(i.SubVV(c, u, i.s_t0), this.m_axis);
            case 1:
                var p = r.MulRV(s.q, this.m_axis, Q);
                u = a.MulXV(s, this.m_localPoint, Z), m = r.MulTRV(n.q, i.NegV(p, i.s_t0), K);
                t[0] = -1, e[0] = this.m_proxyB.GetSupport(m);
                h = this.m_proxyB.GetVertex(e[0]), c = a.MulXV(n, h, H);
                return i.DotVV(i.SubVV(c, u, i.s_t0), p);
            case 2:
                p = r.MulRV(n.q, this.m_axis, Q), c = a.MulXV(n, this.m_localPoint, H), l = r.MulTRV(s.q, i.NegV(p, i.s_t0), Y);
                e[0] = -1, t[0] = this.m_proxyA.GetSupport(l);
                _ = this.m_proxyA.GetVertex(t[0]), u = a.MulXV(s, _, Z);
                return i.DotVV(i.SubVV(u, c, i.s_t0), p);
            default:
                return t[0] = -1, e[0] = -1, 0
            }
        }, b2SeparationFunction.prototype.Evaluate = function (t, e, o) {
            var s = X,
                n = U;
            switch (this.m_sweepA.GetTransform(s, o), this.m_sweepB.GetTransform(n, o), this.m_type) {
            case 0:
                var l = this.m_proxyA.GetVertex(t),
                    m = this.m_proxyB.GetVertex(e),
                    _ = a.MulXV(s, l, Z),
                    h = a.MulXV(n, m, H);
                return i.DotVV(i.SubVV(h, _, i.s_t0), this.m_axis);
            case 1:
                var u = r.MulRV(s.q, this.m_axis, Q);
                _ = a.MulXV(s, this.m_localPoint, Z), m = this.m_proxyB.GetVertex(e), h = a.MulXV(n, m, H);
                return i.DotVV(i.SubVV(h, _, i.s_t0), u);
            case 2:
                u = r.MulRV(n.q, this.m_axis, Q), h = a.MulXV(n, this.m_localPoint, H), l = this.m_proxyA.GetVertex(t), _ = a.MulXV(s, l, Z);
                return i.DotVV(i.SubVV(_, h, i.s_t0), u);
            default:
                return 0
            }
        }, b2SeparationFunction
    }();
    t.b2SeparationFunction = et;
    var it = new h,
        ot = new y,
        st = new b,
        nt = new v,
        rt = new et,
        at = [0],
        lt = [0],
        mt = new l,
        _t = new l;

    function b2TimeOfImpact(e, i) {
        var o = it.Reset();
        ++t.b2_toiCalls, e.state = 0, e.t = i.tMax;
        var s = i.proxyA,
            n = i.proxyB,
            r = mt.Copy(i.sweepA),
            a = _t.Copy(i.sweepB);
        r.Normalize(), a.Normalize();
        var l = i.tMax,
            m = s.m_radius + n.m_radius,
            _ = b2Max(t.b2_linearSlop, m - 3 * t.b2_linearSlop),
            h = .25 * t.b2_linearSlop,
            u = 0,
            c = 0,
            p = ot;
        p.count = 0;
        var f = st;
        for (f.proxyA = i.proxyA, f.proxyB = i.proxyB, f.useRadii = !1;;) {
            var d = X,
                y = U;
            r.GetTransform(d, u), a.GetTransform(y, u), f.transformA.Copy(d), f.transformB.Copy(y);
            var b = nt;
            if (b2Distance(b, p, f), b.distance <= 0) {
                e.state = 2, e.t = 0;
                break
            }
            if (b.distance < _ + h) {
                e.state = 3, e.t = u;
                break
            }
            var v = rt;
            v.Initialize(p, s, r, n, a, u);
            for (var S = !1, x = l, C = 0;;) {
                var A = at,
                    B = lt,
                    V = v.FindMinSeparation(A, B, x);
                if (V > _ + h) {
                    e.state = 4, e.t = l, S = !0;
                    break
                }
                if (V > _ - h) {
                    u = x;
                    break
                }
                var g = v.Evaluate(A[0], B[0], u);
                if (g < _ - h) {
                    e.state = 1, e.t = u, S = !0;
                    break
                }
                if (g <= _ + h) {
                    e.state = 3, e.t = u, S = !0;
                    break
                }
                for (var P = 0, w = u, M = x;;) {
                    var I = 0;
                    I = 1 & P ? w + (_ - g) * (M - w) / (V - g) : .5 * (w + M), ++P, ++t.b2_toiRootIters;
                    var D = v.Evaluate(A[0], B[0], I);
                    if (b2Abs(D - _) < h) {
                        x = I;
                        break
                    }
                    if (D > _ ? (w = I, g = D) : (M = I, V = D), 50 === P) break
                }
                if (t.b2_toiMaxRootIters = b2Max(t.b2_toiMaxRootIters, P), ++C === t.b2_maxPolygonVertices) break
            }
            if (++c, ++t.b2_toiIters, S) break;
            if (20 === c) {
                e.state = 1, e.t = u;
                break
            }
        }
        t.b2_toiMaxIters = b2Max(t.b2_toiMaxIters, c);
        var G = o.GetMilliseconds();
        t.b2_toiMaxTime = b2Max(t.b2_toiMaxTime, G), t.b2_toiTime += G
    }
    t.b2TimeOfImpact = b2TimeOfImpact;
    var ht = function () {
        function b2Profile() {
            this.step = 0, this.collide = 0, this.solve = 0, this.solveInit = 0, this.solveVelocity = 0, this.solvePosition = 0, this.broadphase = 0, this.solveTOI = 0
        }
        return b2Profile.prototype.Reset = function () {
            return this.step = 0, this.collide = 0, this.solve = 0, this.solveInit = 0, this.solveVelocity = 0, this.solvePosition = 0, this.broadphase = 0, this.solveTOI = 0, this
        }, b2Profile
    }();
    t.b2Profile = ht;
    var ut = function () {
        function b2TimeStep() {
            this.dt = 0, this.inv_dt = 0, this.dtRatio = 0, this.velocityIterations = 0, this.positionIterations = 0, this.particleIterations = 0, this.warmStarting = !1
        }
        return b2TimeStep.prototype.Copy = function (t) {
            return this.dt = t.dt, this.inv_dt = t.inv_dt, this.dtRatio = t.dtRatio, this.positionIterations = t.positionIterations, this.velocityIterations = t.velocityIterations, this.particleIterations = t.particleIterations, this.warmStarting = t.warmStarting, this
        }, b2TimeStep
    }();
    t.b2TimeStep = ut;
    var ct = function () {
        function b2Position() {
            this.c = new i, this.a = 0
        }
        return b2Position.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2Position
            })
        }, b2Position
    }();
    t.b2Position = ct;
    var pt = function () {
        function b2Velocity() {
            this.v = new i, this.w = 0
        }
        return b2Velocity.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2Velocity
            })
        }, b2Velocity
    }();
    t.b2Velocity = pt;
    var ft = function () {
        return function () {
            this.step = new ut, this.positions = null, this.velocities = null
        }
    }();
    t.b2SolverData = ft;
    var dt = function () {
        function b2Jacobian() {
            this.linear = new i, this.angularA = 0, this.angularB = 0
        }
        return b2Jacobian.prototype.SetZero = function () {
            return this.linear.SetZero(), this.angularA = 0, this.angularB = 0, this
        }, b2Jacobian.prototype.Set = function (t, e, i) {
            return this.linear.Copy(t), this.angularA = e, this.angularB = i, this
        }, b2Jacobian
    }();
    t.b2Jacobian = dt;
    var yt = function () {
        return function () {
            this.other = null, this.joint = null, this.prev = null, this.next = null
        }
    }();
    t.b2JointEdge = yt;
    var bt = function () {
        return function (t) {
            this.type = 0, this.userData = null, this.bodyA = null, this.bodyB = null, this.collideConnected = !1, this.type = t
        }
    }();
    t.b2JointDef = bt;
    var vt = function () {
        function b2Joint(t) {
            this.m_type = 0, this.m_prev = null, this.m_next = null, this.m_edgeA = new yt, this.m_edgeB = new yt, this.m_bodyA = null, this.m_bodyB = null, this.m_index = 0, this.m_islandFlag = !1, this.m_collideConnected = !1, this.m_userData = null, this.m_type = t.type, this.m_bodyA = t.bodyA, this.m_bodyB = t.bodyB, this.m_collideConnected = t.collideConnected, this.m_userData = t.userData
        }
        return b2Joint.prototype.GetType = function () {
            return this.m_type
        }, b2Joint.prototype.GetBodyA = function () {
            return this.m_bodyA
        }, b2Joint.prototype.GetBodyB = function () {
            return this.m_bodyB
        }, b2Joint.prototype.GetAnchorA = function (t) {
            return t.SetZero()
        }, b2Joint.prototype.GetAnchorB = function (t) {
            return t.SetZero()
        }, b2Joint.prototype.GetReactionForce = function (t, e) {
            return e.SetZero()
        }, b2Joint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2Joint.prototype.GetNext = function () {
            return this.m_next
        }, b2Joint.prototype.GetUserData = function () {
            return this.m_userData
        }, b2Joint.prototype.SetUserData = function (t) {
            this.m_userData = t
        }, b2Joint.prototype.IsActive = function () {
            return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
        }, b2Joint.prototype.GetCollideConnected = function () {
            return this.m_collideConnected
        }, b2Joint.prototype.Dump = function (t) {
            t("// Dump is not supported for this joint type.\n")
        }, b2Joint.prototype.ShiftOrigin = function (t) {}, b2Joint.prototype.InitVelocityConstraints = function (t) {}, b2Joint.prototype.SolveVelocityConstraints = function (t) {}, b2Joint.prototype.SolvePositionConstraints = function (t) {
            return !1
        }, b2Joint
    }();
    t.b2Joint = vt;
    var St = function () {
        function b2Filter() {
            this.categoryBits = 1, this.maskBits = 65535, this.groupIndex = 0
        }
        return b2Filter.prototype.Clone = function () {
            return (new b2Filter).Copy(this)
        }, b2Filter.prototype.Copy = function (t) {
            return this.categoryBits = t.categoryBits, this.maskBits = t.maskBits, this.groupIndex = t.groupIndex, this
        }, b2Filter
    }();
    t.b2Filter = St;
    var xt = function () {
        return function () {
            this.shape = null, this.userData = null, this.friction = .2, this.restitution = 0, this.density = 0, this.isSensor = !1, this.filter = new St
        }
    }();
    t.b2FixtureDef = xt;
    var Ct = function () {
        function b2FixtureProxy() {
            this.aabb = new z, this.fixture = null, this.childIndex = 0, this.proxy = null
        }
        return b2FixtureProxy.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2FixtureProxy
            })
        }, b2FixtureProxy
    }();
    t.b2FixtureProxy = Ct;
    var At = function () {
        function b2Fixture() {
            this.m_density = 0, this.m_next = null, this.m_body = null, this.m_shape = null, this.m_friction = 0, this.m_restitution = 0, this.m_proxies = null, this.m_proxyCount = 0, this.m_filter = new St, this.m_isSensor = !1, this.m_userData = null
        }
        return b2Fixture.prototype.GetType = function () {
            return this.m_shape.GetType()
        }, b2Fixture.prototype.GetShape = function () {
            return this.m_shape
        }, b2Fixture.prototype.SetSensor = function (t) {
            t !== this.m_isSensor && (this.m_body.SetAwake(!0), this.m_isSensor = t)
        }, b2Fixture.prototype.IsSensor = function () {
            return this.m_isSensor
        }, b2Fixture.prototype.SetFilterData = function (t) {
            this.m_filter.Copy(t), this.Refilter()
        }, b2Fixture.prototype.GetFilterData = function () {
            return this.m_filter
        }, b2Fixture.prototype.Refilter = function () {
            if (!this.m_body) {
                for (var t = this.m_body.GetContactList(); t;) {
                    var e = t.contact,
                        i = e.GetFixtureA(),
                        o = e.GetFixtureB();
                    i !== this && o !== this || e.FlagForFiltering(), t = t.next
                }
                var s = this.m_body.GetWorld();
                if (null !== s)
                    for (var n = s.m_contactManager.m_broadPhase, r = 0; r < this.m_proxyCount; ++r) n.TouchProxy(this.m_proxies[r].proxy)
            }
        }, b2Fixture.prototype.GetBody = function () {
            return this.m_body
        }, b2Fixture.prototype.GetNext = function () {
            return this.m_next
        }, b2Fixture.prototype.GetUserData = function () {
            return this.m_userData
        }, b2Fixture.prototype.SetUserData = function (t) {
            this.m_userData = t
        }, b2Fixture.prototype.TestPoint = function (t) {
            return this.m_shape.TestPoint(this.m_body.GetTransform(), t)
        }, b2Fixture.prototype.ComputeDistance = function (t, e, i) {
            return this.m_shape.ComputeDistance(this.m_body.GetTransform(), t, e, i)
        }, b2Fixture.prototype.RayCast = function (t, e, i) {
            return this.m_shape.RayCast(t, e, this.m_body.GetTransform(), i)
        }, b2Fixture.prototype.GetMassData = function (t) {
            return void 0 === t && (t = new I), this.m_shape.ComputeMass(t, this.m_density), t
        }, b2Fixture.prototype.SetDensity = function (t) {
            this.m_density = t
        }, b2Fixture.prototype.GetDensity = function () {
            return this.m_density
        }, b2Fixture.prototype.GetFriction = function () {
            return this.m_friction
        }, b2Fixture.prototype.SetFriction = function (t) {
            this.m_friction = t
        }, b2Fixture.prototype.GetRestitution = function () {
            return this.m_restitution
        }, b2Fixture.prototype.SetRestitution = function (t) {
            this.m_restitution = t
        }, b2Fixture.prototype.GetAABB = function (t) {
            return this.m_proxies[t].aabb
        }, b2Fixture.prototype.Dump = function (t, e) {
            t("    const fd: b2FixtureDef = new b2FixtureDef();\n"), t("    fd.friction = %.15f;\n", this.m_friction), t("    fd.restitution = %.15f;\n", this.m_restitution), t("    fd.density = %.15f;\n", this.m_density), t("    fd.isSensor = %s;\n", this.m_isSensor ? "true" : "false"), t("    fd.filter.categoryBits = %d;\n", this.m_filter.categoryBits), t("    fd.filter.maskBits = %d;\n", this.m_filter.maskBits), t("    fd.filter.groupIndex = %d;\n", this.m_filter.groupIndex), this.m_shape.Dump(t), t("\n"), t("    fd.shape = shape;\n"), t("\n"), t("    bodies[%d].CreateFixture(fd);\n", e)
        }, b2Fixture.prototype.Create = function (t, e) {
            this.m_userData = e.userData, this.m_friction = e.friction, this.m_restitution = e.restitution, this.m_body = t, this.m_next = null, this.m_filter.Copy(e.filter), this.m_isSensor = e.isSensor, this.m_shape = e.shape.Clone(), this.m_proxies = Ct.MakeArray(this.m_shape.GetChildCount()), this.m_proxyCount = 0, this.m_density = e.density
        }, b2Fixture.prototype.Destroy = function () {
            this.m_shape = null
        }, b2Fixture.prototype.CreateProxies = function (t, e) {
            this.m_proxyCount = this.m_shape.GetChildCount();
            for (var i = 0; i < this.m_proxyCount; ++i) {
                var o = this.m_proxies[i];
                this.m_shape.ComputeAABB(o.aabb, e, i), o.proxy = t.CreateProxy(o.aabb, o), o.fixture = this, o.childIndex = i
            }
        }, b2Fixture.prototype.DestroyProxies = function (t) {
            for (var e = 0; e < this.m_proxyCount; ++e) {
                var i = this.m_proxies[e];
                t.DestroyProxy(i.proxy), i.proxy = null
            }
            this.m_proxyCount = 0
        }, b2Fixture.prototype.Synchronize = function (t, e, o) {
            if (0 !== this.m_proxyCount)
                for (var s = 0; s < this.m_proxyCount; ++s) {
                    var n = this.m_proxies[s],
                        r = b2Fixture.Synchronize_s_aabb1,
                        a = b2Fixture.Synchronize_s_aabb2;
                    this.m_shape.ComputeAABB(r, e, s), this.m_shape.ComputeAABB(a, o, s), n.aabb.Combine2(r, a);
                    var l = i.SubVV(o.p, e.p, b2Fixture.Synchronize_s_displacement);
                    t.MoveProxy(n.proxy, n.aabb, l)
                }
        }, b2Fixture.Synchronize_s_aabb1 = new z, b2Fixture.Synchronize_s_aabb2 = new z, b2Fixture.Synchronize_s_displacement = new i, b2Fixture
    }();
    t.b2Fixture = At;
    var Bt = function (e) {
        function b2EdgeShape() {
            var o = e.call(this, 1, t.b2_polygonRadius) || this;
            return o.m_vertex1 = new i, o.m_vertex2 = new i, o.m_vertex0 = new i, o.m_vertex3 = new i, o.m_hasVertex0 = !1, o.m_hasVertex3 = !1, o
        }
        return __extends(b2EdgeShape, e), b2EdgeShape.prototype.Set = function (t, e) {
            return this.m_vertex1.Copy(t), this.m_vertex2.Copy(e), this.m_hasVertex0 = !1, this.m_hasVertex3 = !1, this
        }, b2EdgeShape.prototype.Clone = function () {
            return (new b2EdgeShape).Copy(this)
        }, b2EdgeShape.prototype.Copy = function (t) {
            return e.prototype.Copy.call(this, t), this.m_vertex1.Copy(t.m_vertex1), this.m_vertex2.Copy(t.m_vertex2), this.m_vertex0.Copy(t.m_vertex0), this.m_vertex3.Copy(t.m_vertex3), this.m_hasVertex0 = t.m_hasVertex0, this.m_hasVertex3 = t.m_hasVertex3, this
        }, b2EdgeShape.prototype.GetChildCount = function () {
            return 1
        }, b2EdgeShape.prototype.TestPoint = function (t, e) {
            return !1
        }, b2EdgeShape.prototype.ComputeDistance = function (t, e, o, s) {
            var n = a.MulXV(t, this.m_vertex1, b2EdgeShape.ComputeDistance_s_v1),
                r = a.MulXV(t, this.m_vertex2, b2EdgeShape.ComputeDistance_s_v2),
                l = i.SubVV(e, n, b2EdgeShape.ComputeDistance_s_d),
                m = i.SubVV(r, n, b2EdgeShape.ComputeDistance_s_s),
                _ = i.DotVV(l, m);
            if (_ > 0) {
                var h = i.DotVV(m, m);
                _ > h ? i.SubVV(e, r, l) : l.SelfMulSub(_ / h, m)
            }
            return o.Copy(l), o.Normalize()
        }, b2EdgeShape.prototype.RayCast = function (t, e, o, s) {
            var n = a.MulTXV(o, e.p1, b2EdgeShape.RayCast_s_p1),
                l = a.MulTXV(o, e.p2, b2EdgeShape.RayCast_s_p2),
                m = i.SubVV(l, n, b2EdgeShape.RayCast_s_d),
                _ = this.m_vertex1,
                h = this.m_vertex2,
                u = i.SubVV(h, _, b2EdgeShape.RayCast_s_e),
                c = t.normal.Set(u.y, -u.x).SelfNormalize(),
                p = i.DotVV(c, i.SubVV(_, n, i.s_t0)),
                f = i.DotVV(c, m);
            if (0 === f) return !1;
            var d = p / f;
            if (d < 0 || e.maxFraction < d) return !1;
            var y = i.AddVMulSV(n, d, m, b2EdgeShape.RayCast_s_q),
                b = i.SubVV(h, _, b2EdgeShape.RayCast_s_r),
                v = i.DotVV(b, b);
            if (0 === v) return !1;
            var S = i.DotVV(i.SubVV(y, _, i.s_t0), b) / v;
            return !(S < 0 || 1 < S) && (t.fraction = d, r.MulRV(o.q, t.normal, t.normal), p > 0 && t.normal.SelfNeg(), !0)
        }, b2EdgeShape.prototype.ComputeAABB = function (t, e, o) {
            var s = a.MulXV(e, this.m_vertex1, b2EdgeShape.ComputeAABB_s_v1),
                n = a.MulXV(e, this.m_vertex2, b2EdgeShape.ComputeAABB_s_v2);
            i.MinV(s, n, t.lowerBound), i.MaxV(s, n, t.upperBound);
            var r = this.m_radius;
            t.lowerBound.SelfSubXY(r, r), t.upperBound.SelfAddXY(r, r)
        }, b2EdgeShape.prototype.ComputeMass = function (t, e) {
            t.mass = 0, i.MidVV(this.m_vertex1, this.m_vertex2, t.center), t.I = 0
        }, b2EdgeShape.prototype.SetupDistanceProxy = function (t, e) {
            t.m_vertices = t.m_buffer, t.m_vertices[0].Copy(this.m_vertex1), t.m_vertices[1].Copy(this.m_vertex2), t.m_count = 2, t.m_radius = this.m_radius
        }, b2EdgeShape.prototype.ComputeSubmergedArea = function (t, e, i, o) {
            return o.SetZero(), 0
        }, b2EdgeShape.prototype.Dump = function (t) {
            t("    const shape: b2EdgeShape = new b2EdgeShape();\n"), t("    shape.m_radius = %.15f;\n", this.m_radius), t("    shape.m_vertex0.Set(%.15f, %.15f);\n", this.m_vertex0.x, this.m_vertex0.y), t("    shape.m_vertex1.Set(%.15f, %.15f);\n", this.m_vertex1.x, this.m_vertex1.y), t("    shape.m_vertex2.Set(%.15f, %.15f);\n", this.m_vertex2.x, this.m_vertex2.y), t("    shape.m_vertex3.Set(%.15f, %.15f);\n", this.m_vertex3.x, this.m_vertex3.y), t("    shape.m_hasVertex0 = %s;\n", this.m_hasVertex0), t("    shape.m_hasVertex3 = %s;\n", this.m_hasVertex3)
        }, b2EdgeShape.ComputeDistance_s_v1 = new i, b2EdgeShape.ComputeDistance_s_v2 = new i, b2EdgeShape.ComputeDistance_s_d = new i, b2EdgeShape.ComputeDistance_s_s = new i, b2EdgeShape.RayCast_s_p1 = new i, b2EdgeShape.RayCast_s_p2 = new i, b2EdgeShape.RayCast_s_d = new i, b2EdgeShape.RayCast_s_e = new i, b2EdgeShape.RayCast_s_q = new i, b2EdgeShape.RayCast_s_r = new i, b2EdgeShape.ComputeAABB_s_v1 = new i, b2EdgeShape.ComputeAABB_s_v2 = new i, b2EdgeShape
    }(D);
    t.b2EdgeShape = Bt;
    var Vt = function (e) {
        function b2ChainShape() {
            var o = e.call(this, 3, t.b2_polygonRadius) || this;
            return o.m_count = 0, o.m_prevVertex = new i, o.m_nextVertex = new i, o.m_hasPrevVertex = !1, o.m_hasNextVertex = !1, o
        }
        return __extends(b2ChainShape, e), b2ChainShape.prototype.CreateLoop = function (t, e) {
            void 0 === e && (e = t.length), this.m_count = e + 1, this.m_vertices = i.MakeArray(this.m_count);
            for (var o = 0; o < e; ++o) this.m_vertices[o].Copy(t[o]);
            return this.m_vertices[e].Copy(this.m_vertices[0]), this.m_prevVertex.Copy(this.m_vertices[this.m_count - 2]), this.m_nextVertex.Copy(this.m_vertices[1]), this.m_hasPrevVertex = !0, this.m_hasNextVertex = !0, this
        }, b2ChainShape.prototype.CreateChain = function (t, e) {
            void 0 === e && (e = t.length), this.m_count = e, this.m_vertices = i.MakeArray(e);
            for (var o = 0; o < e; ++o) this.m_vertices[o].Copy(t[o]);
            return this.m_hasPrevVertex = !1, this.m_hasNextVertex = !1, this.m_prevVertex.SetZero(), this.m_nextVertex.SetZero(), this
        }, b2ChainShape.prototype.SetPrevVertex = function (t) {
            return this.m_prevVertex.Copy(t), this.m_hasPrevVertex = !0, this
        }, b2ChainShape.prototype.SetNextVertex = function (t) {
            return this.m_nextVertex.Copy(t), this.m_hasNextVertex = !0, this
        }, b2ChainShape.prototype.Clone = function () {
            return (new b2ChainShape).Copy(this)
        }, b2ChainShape.prototype.Copy = function (t) {
            return e.prototype.Copy.call(this, t), this.CreateChain(t.m_vertices, t.m_count), this.m_prevVertex.Copy(t.m_prevVertex), this.m_nextVertex.Copy(t.m_nextVertex), this.m_hasPrevVertex = t.m_hasPrevVertex, this.m_hasNextVertex = t.m_hasNextVertex, this
        }, b2ChainShape.prototype.GetChildCount = function () {
            return this.m_count - 1
        }, b2ChainShape.prototype.GetChildEdge = function (t, e) {
            t.m_type = 1, t.m_radius = this.m_radius, t.m_vertex1.Copy(this.m_vertices[e]), t.m_vertex2.Copy(this.m_vertices[e + 1]), e > 0 ? (t.m_vertex0.Copy(this.m_vertices[e - 1]), t.m_hasVertex0 = !0) : (t.m_vertex0.Copy(this.m_prevVertex), t.m_hasVertex0 = this.m_hasPrevVertex), e < this.m_count - 2 ? (t.m_vertex3.Copy(this.m_vertices[e + 2]), t.m_hasVertex3 = !0) : (t.m_vertex3.Copy(this.m_nextVertex), t.m_hasVertex3 = this.m_hasNextVertex)
        }, b2ChainShape.prototype.TestPoint = function (t, e) {
            return !1
        }, b2ChainShape.prototype.ComputeDistance = function (t, e, i, o) {
            var s = b2ChainShape.ComputeDistance_s_edgeShape;
            return this.GetChildEdge(s, o), s.ComputeDistance(t, e, i, 0)
        }, b2ChainShape.prototype.RayCast = function (t, e, i, o) {
            var s = b2ChainShape.RayCast_s_edgeShape;
            return s.m_vertex1.Copy(this.m_vertices[o]), s.m_vertex2.Copy(this.m_vertices[(o + 1) % this.m_count]), s.RayCast(t, e, i, 0)
        }, b2ChainShape.prototype.ComputeAABB = function (t, e, o) {
            var s = this.m_vertices[o],
                n = this.m_vertices[(o + 1) % this.m_count],
                r = a.MulXV(e, s, b2ChainShape.ComputeAABB_s_v1),
                l = a.MulXV(e, n, b2ChainShape.ComputeAABB_s_v2);
            i.MinV(r, l, t.lowerBound), i.MaxV(r, l, t.upperBound)
        }, b2ChainShape.prototype.ComputeMass = function (t, e) {
            t.mass = 0, t.center.SetZero(), t.I = 0
        }, b2ChainShape.prototype.SetupDistanceProxy = function (t, e) {
            t.m_vertices = t.m_buffer, t.m_vertices[0].Copy(this.m_vertices[e]), e + 1 < this.m_count ? t.m_vertices[1].Copy(this.m_vertices[e + 1]) : t.m_vertices[1].Copy(this.m_vertices[0]), t.m_count = 2, t.m_radius = this.m_radius
        }, b2ChainShape.prototype.ComputeSubmergedArea = function (t, e, i, o) {
            return o.SetZero(), 0
        }, b2ChainShape.prototype.Dump = function (e) {
            e("    const shape: b2ChainShape = new b2ChainShape();\n"), e("    const vs: b2Vec2[] = b2Vec2.MakeArray(%d);\n", t.b2_maxPolygonVertices);
            for (var i = 0; i < this.m_count; ++i) e("    vs[%d].Set(%.15f, %.15f);\n", i, this.m_vertices[i].x, this.m_vertices[i].y);
            e("    shape.CreateChain(vs, %d);\n", this.m_count), e("    shape.m_prevVertex.Set(%.15f, %.15f);\n", this.m_prevVertex.x, this.m_prevVertex.y), e("    shape.m_nextVertex.Set(%.15f, %.15f);\n", this.m_nextVertex.x, this.m_nextVertex.y), e("    shape.m_hasPrevVertex = %s;\n", this.m_hasPrevVertex ? "true" : "false"), e("    shape.m_hasNextVertex = %s;\n", this.m_hasNextVertex ? "true" : "false")
        }, b2ChainShape.ComputeDistance_s_edgeShape = new Bt, b2ChainShape.RayCast_s_edgeShape = new Bt, b2ChainShape.ComputeAABB_s_v1 = new i, b2ChainShape.ComputeAABB_s_v2 = new i, b2ChainShape
    }(D);
    t.b2ChainShape = Vt;
    var gt = function (e) {
        function b2CircleShape(t) {
            void 0 === t && (t = 0);
            var o = e.call(this, 0, t) || this;
            return o.m_p = new i, o
        }
        return __extends(b2CircleShape, e), b2CircleShape.prototype.Clone = function () {
            return (new b2CircleShape).Copy(this)
        }, b2CircleShape.prototype.Copy = function (t) {
            return e.prototype.Copy.call(this, t), this.m_p.Copy(t.m_p), this
        }, b2CircleShape.prototype.GetChildCount = function () {
            return 1
        }, b2CircleShape.prototype.TestPoint = function (t, e) {
            var o = a.MulXV(t, this.m_p, b2CircleShape.TestPoint_s_center),
                s = i.SubVV(e, o, b2CircleShape.TestPoint_s_d);
            return i.DotVV(s, s) <= b2Sq(this.m_radius)
        }, b2CircleShape.prototype.ComputeDistance = function (t, e, o, s) {
            var n = a.MulXV(t, this.m_p, b2CircleShape.ComputeDistance_s_center);
            return i.SubVV(e, n, o), o.Normalize() - this.m_radius
        }, b2CircleShape.prototype.RayCast = function (e, o, s, n) {
            var r = a.MulXV(s, this.m_p, b2CircleShape.RayCast_s_position),
                l = i.SubVV(o.p1, r, b2CircleShape.RayCast_s_s),
                m = i.DotVV(l, l) - b2Sq(this.m_radius),
                _ = i.SubVV(o.p2, o.p1, b2CircleShape.RayCast_s_r),
                h = i.DotVV(l, _),
                u = i.DotVV(_, _),
                c = h * h - u * m;
            if (c < 0 || u < t.b2_epsilon) return !1;
            var p = -(h + b2Sqrt(c));
            return 0 <= p && p <= o.maxFraction * u && (p /= u, e.fraction = p, i.AddVMulSV(l, p, _, e.normal).SelfNormalize(), !0)
        }, b2CircleShape.prototype.ComputeAABB = function (t, e, i) {
            var o = a.MulXV(e, this.m_p, b2CircleShape.ComputeAABB_s_p);
            t.lowerBound.Set(o.x - this.m_radius, o.y - this.m_radius), t.upperBound.Set(o.x + this.m_radius, o.y + this.m_radius)
        }, b2CircleShape.prototype.ComputeMass = function (e, o) {
            var s = b2Sq(this.m_radius);
            e.mass = o * t.b2_pi * s, e.center.Copy(this.m_p), e.I = e.mass * (.5 * s + i.DotVV(this.m_p, this.m_p))
        }, b2CircleShape.prototype.SetupDistanceProxy = function (t, e) {
            t.m_vertices = t.m_buffer, t.m_vertices[0].Copy(this.m_p), t.m_count = 1, t.m_radius = this.m_radius
        }, b2CircleShape.prototype.ComputeSubmergedArea = function (e, o, s, n) {
            var r = a.MulXV(s, this.m_p, new i),
                l = -(i.DotVV(e, r) - o);
            if (l < -this.m_radius + t.b2_epsilon) return 0;
            if (l > this.m_radius) return n.Copy(r), t.b2_pi * this.m_radius * this.m_radius;
            var m = this.m_radius * this.m_radius,
                _ = l * l,
                h = m * (b2Asin(l / this.m_radius) + t.b2_pi / 2) + l * b2Sqrt(m - _),
                u = -2 / 3 * b2Pow(m - _, 1.5) / h;
            return n.x = r.x + e.x * u, n.y = r.y + e.y * u, h
        }, b2CircleShape.prototype.Dump = function (t) {
            t("    const shape: b2CircleShape = new b2CircleShape();\n"), t("    shape.m_radius = %.15f;\n", this.m_radius), t("    shape.m_p.Set(%.15f, %.15f);\n", this.m_p.x, this.m_p.y)
        }, b2CircleShape.TestPoint_s_center = new i, b2CircleShape.TestPoint_s_d = new i, b2CircleShape.ComputeDistance_s_center = new i, b2CircleShape.RayCast_s_position = new i, b2CircleShape.RayCast_s_s = new i, b2CircleShape.RayCast_s_r = new i, b2CircleShape.ComputeAABB_s_p = new i, b2CircleShape
    }(D);
    t.b2CircleShape = gt;
    var Pt = function (e) {
        function b2PolygonShape() {
            var o = e.call(this, 2, t.b2_polygonRadius) || this;
            return o.m_centroid = new i(0, 0), o.m_vertices = i.MakeArray(t.b2_maxPolygonVertices), o.m_normals = i.MakeArray(t.b2_maxPolygonVertices), o.m_count = 0, o
        }
        return __extends(b2PolygonShape, e), b2PolygonShape.prototype.Clone = function () {
            return (new b2PolygonShape).Copy(this)
        }, b2PolygonShape.prototype.Copy = function (t) {
            e.prototype.Copy.call(this, t), this.m_centroid.Copy(t.m_centroid), this.m_count = t.m_count;
            for (var i = 0; i < this.m_count; ++i) this.m_vertices[i].Copy(t.m_vertices[i]), this.m_normals[i].Copy(t.m_normals[i]);
            return this
        }, b2PolygonShape.prototype.GetChildCount = function () {
            return 1
        }, b2PolygonShape.prototype.Set = function (e, o, s) {
            if (void 0 === o && (o = e.length), void 0 === s && (s = 0), o < 3) return this.SetAsBox(1, 1);
            for (var n = b2Min(o, t.b2_maxPolygonVertices), r = b2PolygonShape.Set_s_ps, a = 0, l = 0; l < n; ++l) {
                for (var m = e[s + l], _ = !0, h = 0; h < a; ++h)
                    if (i.DistanceSquaredVV(m, r[h]) < .5 * t.b2_linearSlop * (.5 * t.b2_linearSlop)) {
                        _ = !1;
                        break
                    }
                _ && r[a++].Copy(m)
            }
            if ((n = a) < 3) return this.SetAsBox(1, 1);
            var u = 0,
                c = r[0].x;
            for (l = 1; l < n; ++l) {
                var p = r[l].x;
                (p > c || p === c && r[l].y < r[u].y) && (u = l, c = p)
            }
            for (var f = b2PolygonShape.Set_s_hull, d = 0, y = u;;) {
                f[d] = y;
                var b = 0;
                for (h = 1; h < n; ++h)
                    if (b !== y) {
                        var v = i.SubVV(r[b], r[f[d]], b2PolygonShape.Set_s_r),
                            S = (m = i.SubVV(r[h], r[f[d]], b2PolygonShape.Set_s_v), i.CrossVV(v, m));
                        S < 0 && (b = h), 0 === S && m.LengthSquared() > v.LengthSquared() && (b = h)
                    } else b = h;
                if (++d, y = b, b === u) break
            }
            this.m_count = d;
            for (l = 0; l < d; ++l) this.m_vertices[l].Copy(r[f[l]]);
            for (l = 0; l < d; ++l) {
                var x = this.m_vertices[l],
                    C = this.m_vertices[(l + 1) % d],
                    A = i.SubVV(C, x, i.s_t0);
                i.CrossVOne(A, this.m_normals[l]).SelfNormalize()
            }
            return b2PolygonShape.ComputeCentroid(this.m_vertices, d, this.m_centroid), this
        }, b2PolygonShape.prototype.SetAsArray = function (t, e) {
            return void 0 === e && (e = t.length), this.Set(t, e)
        }, b2PolygonShape.prototype.SetAsBox = function (t, e, o, s) {
            if (void 0 === s && (s = 0), this.m_count = 4, this.m_vertices[0].Set(-t, -e), this.m_vertices[1].Set(t, -e), this.m_vertices[2].Set(t, e), this.m_vertices[3].Set(-t, e), this.m_normals[0].Set(0, -1), this.m_normals[1].Set(1, 0), this.m_normals[2].Set(0, 1), this.m_normals[3].Set(-1, 0), this.m_centroid.SetZero(), o instanceof i) {
                this.m_centroid.Copy(o);
                var n = new a;
                n.SetPosition(o), n.SetRotationAngle(s);
                for (var l = 0; l < this.m_count; ++l) a.MulXV(n, this.m_vertices[l], this.m_vertices[l]), r.MulRV(n.q, this.m_normals[l], this.m_normals[l])
            }
            return this
        }, b2PolygonShape.prototype.TestPoint = function (t, e) {
            for (var o = a.MulTXV(t, e, b2PolygonShape.TestPoint_s_pLocal), s = 0; s < this.m_count; ++s) {
                if (i.DotVV(this.m_normals[s], i.SubVV(o, this.m_vertices[s], i.s_t0)) > 0) return !1
            }
            return !0
        }, b2PolygonShape.prototype.ComputeDistance = function (e, o, s, n) {
            for (var l = a.MulTXV(e, o, b2PolygonShape.ComputeDistance_s_pLocal), m = -t.b2_maxFloat, _ = b2PolygonShape.ComputeDistance_s_normalForMaxDistance.Copy(l), h = 0; h < this.m_count; ++h) {
                var u = i.DotVV(this.m_normals[h], i.SubVV(l, this.m_vertices[h], i.s_t0));
                u > m && (m = u, _.Copy(this.m_normals[h]))
            }
            if (m > 0) {
                var c = b2PolygonShape.ComputeDistance_s_minDistance.Copy(_),
                    p = m * m;
                for (h = 0; h < this.m_count; ++h) {
                    var f = i.SubVV(l, this.m_vertices[h], b2PolygonShape.ComputeDistance_s_distance),
                        d = f.LengthSquared();
                    p > d && (c.Copy(f), p = d)
                }
                return r.MulRV(e.q, c, s), s.Normalize(), Math.sqrt(p)
            }
            return r.MulRV(e.q, _, s), m
        }, b2PolygonShape.prototype.RayCast = function (t, e, o, s) {
            for (var n = a.MulTXV(o, e.p1, b2PolygonShape.RayCast_s_p1), l = a.MulTXV(o, e.p2, b2PolygonShape.RayCast_s_p2), m = i.SubVV(l, n, b2PolygonShape.RayCast_s_d), _ = 0, h = e.maxFraction, u = -1, c = 0; c < this.m_count; ++c) {
                var p = i.DotVV(this.m_normals[c], i.SubVV(this.m_vertices[c], n, i.s_t0)),
                    f = i.DotVV(this.m_normals[c], m);
                if (0 === f) {
                    if (p < 0) return !1
                } else f < 0 && p < _ * f ? (_ = p / f, u = c) : f > 0 && p < h * f && (h = p / f); if (h < _) return !1
            }
            return u >= 0 && (t.fraction = _, r.MulRV(o.q, this.m_normals[u], t.normal), !0)
        }, b2PolygonShape.prototype.ComputeAABB = function (t, e, o) {
            for (var s = a.MulXV(e, this.m_vertices[0], t.lowerBound), n = t.upperBound.Copy(s), r = 0; r < this.m_count; ++r) {
                var l = a.MulXV(e, this.m_vertices[r], b2PolygonShape.ComputeAABB_s_v);
                i.MinV(l, s, s), i.MaxV(l, n, n)
            }
            var m = this.m_radius;
            s.SelfSubXY(m, m), n.SelfAddXY(m, m)
        }, b2PolygonShape.prototype.ComputeMass = function (t, e) {
            for (var o = b2PolygonShape.ComputeMass_s_center.SetZero(), s = 0, n = 0, r = b2PolygonShape.ComputeMass_s_s.SetZero(), a = 0; a < this.m_count; ++a) r.SelfAdd(this.m_vertices[a]);
            r.SelfMul(1 / this.m_count);
            for (a = 0; a < this.m_count; ++a) {
                var l = i.SubVV(this.m_vertices[a], r, b2PolygonShape.ComputeMass_s_e1),
                    m = i.SubVV(this.m_vertices[(a + 1) % this.m_count], r, b2PolygonShape.ComputeMass_s_e2),
                    _ = i.CrossVV(l, m),
                    h = .5 * _;
                s += h, o.SelfAdd(i.MulSV(h * (1 / 3), i.AddVV(l, m, i.s_t0), i.s_t1));
                var u = l.x,
                    c = l.y,
                    p = m.x,
                    f = m.y;
                n += 1 / 3 * .25 * _ * (u * u + p * u + p * p + (c * c + f * c + f * f))
            }
            t.mass = e * s, o.SelfMul(1 / s), i.AddVV(o, r, t.center), t.I = e * n, t.I += t.mass * (i.DotVV(t.center, t.center) - i.DotVV(o, o))
        }, b2PolygonShape.prototype.Validate = function () {
            for (var t = 0; t < this.m_count; ++t)
                for (var e = t, o = (t + 1) % this.m_count, s = this.m_vertices[e], n = i.SubVV(this.m_vertices[o], s, b2PolygonShape.Validate_s_e), r = 0; r < this.m_count; ++r)
                    if (r !== e && r !== o) {
                        var a = i.SubVV(this.m_vertices[r], s, b2PolygonShape.Validate_s_v);
                        if (i.CrossVV(n, a) < 0) return !1
                    }
            return !0
        }, b2PolygonShape.prototype.SetupDistanceProxy = function (t, e) {
            t.m_vertices = this.m_vertices, t.m_count = this.m_count, t.m_radius = this.m_radius
        }, b2PolygonShape.prototype.ComputeSubmergedArea = function (e, o, s, n) {
            for (var l = r.MulTRV(s.q, e, b2PolygonShape.ComputeSubmergedArea_s_normalL), m = o - i.DotVV(e, s.p), _ = b2PolygonShape.ComputeSubmergedArea_s_depths, h = 0, u = -1, c = -1, p = !1, f = 0; f < this.m_count; ++f) {
                _[f] = i.DotVV(l, this.m_vertices[f]) - m;
                var d = _[f] < -t.b2_epsilon;
                f > 0 && (d ? p || (u = f - 1, h++) : p && (c = f - 1, h++)), p = d
            }
            switch (h) {
            case 0:
                if (p) {
                    var y = b2PolygonShape.ComputeSubmergedArea_s_md;
                    return this.ComputeMass(y, 1), a.MulXV(s, y.center, n), y.mass
                }
                return 0;
            case 1:
                -1 === u ? u = this.m_count - 1 : c = this.m_count - 1
            }
            for (var b, v = (u + 1) % this.m_count, S = (c + 1) % this.m_count, x = (0 - _[u]) / (_[v] - _[u]), C = (0 - _[c]) / (_[S] - _[c]), A = b2PolygonShape.ComputeSubmergedArea_s_intoVec.Set(this.m_vertices[u].x * (1 - x) + this.m_vertices[v].x * x, this.m_vertices[u].y * (1 - x) + this.m_vertices[v].y * x), B = b2PolygonShape.ComputeSubmergedArea_s_outoVec.Set(this.m_vertices[c].x * (1 - C) + this.m_vertices[S].x * C, this.m_vertices[c].y * (1 - C) + this.m_vertices[S].y * C), V = 0, g = b2PolygonShape.ComputeSubmergedArea_s_center.SetZero(), P = this.m_vertices[v], w = v; w !== S;) {
                b = (w = (w + 1) % this.m_count) === S ? B : this.m_vertices[w];
                var M = .5 * ((P.x - A.x) * (b.y - A.y) - (P.y - A.y) * (b.x - A.x));
                V += M, g.x += M * (A.x + P.x + b.x) / 3, g.y += M * (A.y + P.y + b.y) / 3, P = b
            }
            return g.SelfMul(1 / V), a.MulXV(s, g, n), V
        }, b2PolygonShape.prototype.Dump = function (e) {
            e("    const shape: b2PolygonShape = new b2PolygonShape();\n"), e("    const vs: b2Vec2[] = b2Vec2.MakeArray(%d);\n", t.b2_maxPolygonVertices);
            for (var i = 0; i < this.m_count; ++i) e("    vs[%d].Set(%.15f, %.15f);\n", i, this.m_vertices[i].x, this.m_vertices[i].y);
            e("    shape.Set(vs, %d);\n", this.m_count)
        }, b2PolygonShape.ComputeCentroid = function (t, e, o) {
            var s = o;
            s.SetZero();
            for (var n = 0, r = b2PolygonShape.ComputeCentroid_s_pRef.SetZero(), a = 0; a < e; ++a) {
                var l = r,
                    m = t[a],
                    _ = t[(a + 1) % e],
                    h = i.SubVV(m, l, b2PolygonShape.ComputeCentroid_s_e1),
                    u = i.SubVV(_, l, b2PolygonShape.ComputeCentroid_s_e2),
                    c = .5 * i.CrossVV(h, u);
                n += c, s.x += c * (1 / 3) * (l.x + m.x + _.x), s.y += c * (1 / 3) * (l.y + m.y + _.y)
            }
            return s.SelfMul(1 / n), s
        }, b2PolygonShape.Set_s_ps = i.MakeArray(t.b2_maxPolygonVertices), b2PolygonShape.Set_s_hull = b2MakeNumberArray(t.b2_maxPolygonVertices), b2PolygonShape.Set_s_r = new i, b2PolygonShape.Set_s_v = new i, b2PolygonShape.TestPoint_s_pLocal = new i, b2PolygonShape.ComputeDistance_s_pLocal = new i, b2PolygonShape.ComputeDistance_s_normalForMaxDistance = new i, b2PolygonShape.ComputeDistance_s_minDistance = new i, b2PolygonShape.ComputeDistance_s_distance = new i, b2PolygonShape.RayCast_s_p1 = new i, b2PolygonShape.RayCast_s_p2 = new i, b2PolygonShape.RayCast_s_d = new i, b2PolygonShape.ComputeAABB_s_v = new i, b2PolygonShape.ComputeMass_s_center = new i, b2PolygonShape.ComputeMass_s_s = new i, b2PolygonShape.ComputeMass_s_e1 = new i, b2PolygonShape.ComputeMass_s_e2 = new i, b2PolygonShape.Validate_s_e = new i, b2PolygonShape.Validate_s_v = new i, b2PolygonShape.ComputeSubmergedArea_s_normalL = new i, b2PolygonShape.ComputeSubmergedArea_s_depths = b2MakeNumberArray(t.b2_maxPolygonVertices), b2PolygonShape.ComputeSubmergedArea_s_md = new I, b2PolygonShape.ComputeSubmergedArea_s_intoVec = new i, b2PolygonShape.ComputeSubmergedArea_s_outoVec = new i, b2PolygonShape.ComputeSubmergedArea_s_center = new i, b2PolygonShape.ComputeCentroid_s_pRef = new i, b2PolygonShape.ComputeCentroid_s_e1 = new i, b2PolygonShape.ComputeCentroid_s_e2 = new i, b2PolygonShape
    }(D);
    t.b2PolygonShape = Pt;
    var wt = function (t) {
        function b2DistanceJointDef() {
            var e = t.call(this, 3) || this;
            return e.localAnchorA = new i, e.localAnchorB = new i, e.length = 1, e.frequencyHz = 0, e.dampingRatio = 0, e
        }
        return __extends(b2DistanceJointDef, t), b2DistanceJointDef.prototype.Initialize = function (t, e, o, s) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(o, this.localAnchorA), this.bodyB.GetLocalPoint(s, this.localAnchorB), this.length = i.DistanceVV(o, s), this.frequencyHz = 0, this.dampingRatio = 0
        }, b2DistanceJointDef
    }(bt);
    t.b2DistanceJointDef = wt;
    var Mt = function (e) {
        function b2DistanceJoint(t) {
            var o = e.call(this, t) || this;
            return o.m_frequencyHz = 0, o.m_dampingRatio = 0, o.m_bias = 0, o.m_localAnchorA = new i, o.m_localAnchorB = new i, o.m_gamma = 0, o.m_impulse = 0, o.m_length = 0, o.m_indexA = 0, o.m_indexB = 0, o.m_u = new i, o.m_rA = new i, o.m_rB = new i, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_mass = 0, o.m_qA = new r, o.m_qB = new r, o.m_lalcA = new i, o.m_lalcB = new i, o.m_frequencyHz = t.frequencyHz, o.m_dampingRatio = t.dampingRatio, o.m_localAnchorA.Copy(t.localAnchorA), o.m_localAnchorB.Copy(t.localAnchorB), o.m_length = t.length, o
        }
        return __extends(b2DistanceJoint, e), b2DistanceJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2DistanceJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2DistanceJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * this.m_impulse * this.m_u.x, t * this.m_impulse * this.m_u.y)
        }, b2DistanceJoint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2DistanceJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2DistanceJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2DistanceJoint.prototype.SetLength = function (t) {
            this.m_length = t
        }, b2DistanceJoint.prototype.Length = function () {
            return this.m_length
        }, b2DistanceJoint.prototype.SetFrequency = function (t) {
            this.m_frequencyHz = t
        }, b2DistanceJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz
        }, b2DistanceJoint.prototype.SetDampingRatio = function (t) {
            this.m_dampingRatio = t
        }, b2DistanceJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio
        }, b2DistanceJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2DistanceJointDef = new b2DistanceJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.length = %.15f;\n", this.m_length), t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz), t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2DistanceJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.velocities[this.m_indexA].v,
                a = e.velocities[this.m_indexA].w,
                l = e.positions[this.m_indexB].c,
                m = e.positions[this.m_indexB].a,
                _ = e.velocities[this.m_indexB].v,
                h = e.velocities[this.m_indexB].w,
                u = this.m_qA.SetAngle(s),
                c = this.m_qB.SetAngle(m);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), r.MulRV(u, this.m_lalcA, this.m_rA), i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(c, this.m_lalcB, this.m_rB), this.m_u.x = l.x + this.m_rB.x - o.x - this.m_rA.x, this.m_u.y = l.y + this.m_rB.y - o.y - this.m_rA.y;
            var p = this.m_u.Length();
            p > t.b2_linearSlop ? this.m_u.SelfMul(1 / p) : this.m_u.SetZero();
            var f = i.CrossVV(this.m_rA, this.m_u),
                d = i.CrossVV(this.m_rB, this.m_u),
                y = this.m_invMassA + this.m_invIA * f * f + this.m_invMassB + this.m_invIB * d * d;
            if (this.m_mass = 0 !== y ? 1 / y : 0, this.m_frequencyHz > 0) {
                var b = p - this.m_length,
                    v = 2 * t.b2_pi * this.m_frequencyHz,
                    S = 2 * this.m_mass * this.m_dampingRatio * v,
                    x = this.m_mass * v * v,
                    C = e.step.dt;
                this.m_gamma = C * (S + C * x), this.m_gamma = 0 !== this.m_gamma ? 1 / this.m_gamma : 0, this.m_bias = b * C * x * this.m_gamma, y += this.m_gamma, this.m_mass = 0 !== y ? 1 / y : 0
            } else this.m_gamma = 0, this.m_bias = 0; if (e.step.warmStarting) {
                this.m_impulse *= e.step.dtRatio;
                var A = i.MulSV(this.m_impulse, this.m_u, b2DistanceJoint.InitVelocityConstraints_s_P);
                n.SelfMulSub(this.m_invMassA, A), a -= this.m_invIA * i.CrossVV(this.m_rA, A), _.SelfMulAdd(this.m_invMassB, A), h += this.m_invIB * i.CrossVV(this.m_rB, A)
            } else this.m_impulse = 0;
            e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = h
        }, b2DistanceJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = i.AddVCrossSV(e, o, this.m_rA, b2DistanceJoint.SolveVelocityConstraints_s_vpA),
                a = i.AddVCrossSV(s, n, this.m_rB, b2DistanceJoint.SolveVelocityConstraints_s_vpB),
                l = i.DotVV(this.m_u, i.SubVV(a, r, i.s_t0)),
                m = -this.m_mass * (l + this.m_bias + this.m_gamma * this.m_impulse);
            this.m_impulse += m;
            var _ = i.MulSV(m, this.m_u, b2DistanceJoint.SolveVelocityConstraints_s_P);
            e.SelfMulSub(this.m_invMassA, _), o -= this.m_invIA * i.CrossVV(this.m_rA, _), s.SelfMulAdd(this.m_invMassB, _), n += this.m_invIB * i.CrossVV(this.m_rB, _), t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n
        }, b2DistanceJoint.prototype.SolvePositionConstraints = function (e) {
            if (this.m_frequencyHz > 0) return !0;
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = r.MulRV(this.m_qA, this.m_lalcA, this.m_rA),
                m = r.MulRV(this.m_qB, this.m_lalcB, this.m_rB),
                _ = this.m_u;
            _.x = n.x + m.x - o.x - l.x, _.y = n.y + m.y - o.y - l.y;
            var h = this.m_u.Normalize() - this.m_length;
            h = b2Clamp(h, -t.b2_maxLinearCorrection, t.b2_maxLinearCorrection);
            var u = -this.m_mass * h,
                c = i.MulSV(u, _, b2DistanceJoint.SolvePositionConstraints_s_P);
            return o.SelfMulSub(this.m_invMassA, c), s -= this.m_invIA * i.CrossVV(l, c), n.SelfMulAdd(this.m_invMassB, c), a += this.m_invIB * i.CrossVV(m, c), e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, b2Abs(h) < t.b2_linearSlop
        }, b2DistanceJoint.InitVelocityConstraints_s_P = new i, b2DistanceJoint.SolveVelocityConstraints_s_vpA = new i, b2DistanceJoint.SolveVelocityConstraints_s_vpB = new i, b2DistanceJoint.SolveVelocityConstraints_s_P = new i, b2DistanceJoint.SolvePositionConstraints_s_P = new i, b2DistanceJoint
    }(vt);
    t.b2DistanceJoint = Mt;
    var It = function (t) {
        function b2AreaJointDef() {
            var e = t.call(this, 12) || this;
            return e.world = null, e.bodies = [], e.frequencyHz = 0, e.dampingRatio = 0, e
        }
        return __extends(b2AreaJointDef, t), b2AreaJointDef.prototype.AddBody = function (t) {
            this.bodies.push(t), 1 === this.bodies.length ? this.bodyA = t : 2 === this.bodies.length && (this.bodyB = t)
        }, b2AreaJointDef
    }(bt);
    t.b2AreaJointDef = It;
    var Dt = function (e) {
        function b2AreaJoint(t) {
            var o = e.call(this, t) || this;
            o.m_bodies = null, o.m_frequencyHz = 0, o.m_dampingRatio = 0, o.m_impulse = 0, o.m_targetLengths = null, o.m_targetArea = 0, o.m_normals = null, o.m_joints = null, o.m_deltas = null, o.m_delta = null, o.m_bodies = t.bodies, o.m_frequencyHz = t.frequencyHz, o.m_dampingRatio = t.dampingRatio, o.m_targetLengths = b2MakeNumberArray(t.bodies.length), o.m_normals = i.MakeArray(t.bodies.length), o.m_joints = b2MakeNullArray(t.bodies.length), o.m_deltas = i.MakeArray(t.bodies.length), o.m_delta = new i;
            var s = new wt;
            s.frequencyHz = t.frequencyHz, s.dampingRatio = t.dampingRatio, o.m_targetArea = 0;
            for (var n = 0; n < o.m_bodies.length; ++n) {
                var r = o.m_bodies[n],
                    a = o.m_bodies[(n + 1) % o.m_bodies.length],
                    l = r.GetWorldCenter(),
                    m = a.GetWorldCenter();
                o.m_targetLengths[n] = i.DistanceVV(l, m), o.m_targetArea += i.CrossVV(l, m), s.Initialize(r, a, l, m), o.m_joints[n] = t.world.CreateJoint(s)
            }
            return o.m_targetArea *= .5, o
        }
        return __extends(b2AreaJoint, e), b2AreaJoint.prototype.GetAnchorA = function (t) {
            return t.SetZero()
        }, b2AreaJoint.prototype.GetAnchorB = function (t) {
            return t.SetZero()
        }, b2AreaJoint.prototype.GetReactionForce = function (t, e) {
            return e.SetZero()
        }, b2AreaJoint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2AreaJoint.prototype.SetFrequency = function (t) {
            this.m_frequencyHz = t;
            for (var e = 0; e < this.m_joints.length; ++e) this.m_joints[e].SetFrequency(t)
        }, b2AreaJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz
        }, b2AreaJoint.prototype.SetDampingRatio = function (t) {
            this.m_dampingRatio = t;
            for (var e = 0; e < this.m_joints.length; ++e) this.m_joints[e].SetDampingRatio(t)
        }, b2AreaJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio
        }, b2AreaJoint.prototype.Dump = function (t) {
            t("Area joint dumping is not supported.\n")
        }, b2AreaJoint.prototype.InitVelocityConstraints = function (t) {
            for (var e = 0; e < this.m_bodies.length; ++e) {
                var o = this.m_bodies[(e + this.m_bodies.length - 1) % this.m_bodies.length],
                    s = this.m_bodies[(e + 1) % this.m_bodies.length],
                    n = t.positions[o.m_islandIndex].c,
                    r = t.positions[s.m_islandIndex].c,
                    a = this.m_deltas[e];
                i.SubVV(r, n, a)
            }
            if (t.step.warmStarting) {
                this.m_impulse *= t.step.dtRatio;
                for (e = 0; e < this.m_bodies.length; ++e) {
                    var l = this.m_bodies[e],
                        m = t.velocities[l.m_islandIndex].v;
                    a = this.m_deltas[e];
                    m.x += l.m_invMass * a.y * .5 * this.m_impulse, m.y += l.m_invMass * -a.x * .5 * this.m_impulse
                }
            } else this.m_impulse = 0
        }, b2AreaJoint.prototype.SolveVelocityConstraints = function (t) {
            for (var e = 0, o = 0, s = 0; s < this.m_bodies.length; ++s) {
                var n = this.m_bodies[s],
                    r = t.velocities[n.m_islandIndex].v;
                e += (l = this.m_deltas[s]).LengthSquared() / n.GetMass(), o += i.CrossVV(r, l)
            }
            var a = -2 * o / e;
            this.m_impulse += a;
            for (s = 0; s < this.m_bodies.length; ++s) {
                n = this.m_bodies[s], r = t.velocities[n.m_islandIndex].v;
                var l = this.m_deltas[s];
                r.x += n.m_invMass * l.y * .5 * a, r.y += n.m_invMass * -l.x * .5 * a
            }
        }, b2AreaJoint.prototype.SolvePositionConstraints = function (e) {
            for (var o = 0, s = 0, n = 0; n < this.m_bodies.length; ++n) {
                var r = this.m_bodies[n],
                    a = this.m_bodies[(n + 1) % this.m_bodies.length],
                    l = e.positions[r.m_islandIndex].c,
                    m = e.positions[a.m_islandIndex].c,
                    _ = (c = i.SubVV(m, l, this.m_delta)).Length();
                _ < t.b2_epsilon && (_ = 1), this.m_normals[n].x = c.y / _, this.m_normals[n].y = -c.x / _, o += _, s += i.CrossVV(l, m)
            }
            s *= .5;
            var h = .5 * (this.m_targetArea - s) / o,
                u = !0;
            for (n = 0; n < this.m_bodies.length; ++n) {
                r = this.m_bodies[n], l = e.positions[r.m_islandIndex].c;
                var c, p = (n + 1) % this.m_bodies.length;
                (c = i.AddVV(this.m_normals[n], this.m_normals[p], this.m_delta)).SelfMul(h);
                var f = c.LengthSquared();
                f > b2Sq(t.b2_maxLinearCorrection) && c.SelfMul(t.b2_maxLinearCorrection / b2Sqrt(f)), f > b2Sq(t.b2_linearSlop) && (u = !1), l.x += c.x, l.y += c.y
            }
            return u
        }, b2AreaJoint
    }(vt);
    t.b2AreaJoint = Dt;
    var Gt = function (t) {
        function b2FrictionJointDef() {
            var e = t.call(this, 9) || this;
            return e.localAnchorA = new i, e.localAnchorB = new i, e.maxForce = 0, e.maxTorque = 0, e
        }
        return __extends(b2FrictionJointDef, t), b2FrictionJointDef.prototype.Initialize = function (t, e, i) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(i, this.localAnchorA), this.bodyB.GetLocalPoint(i, this.localAnchorB)
        }, b2FrictionJointDef
    }(bt);
    t.b2FrictionJointDef = Gt;
    var Ft = function (t) {
        function b2FrictionJoint(e) {
            var o = t.call(this, e) || this;
            return o.m_localAnchorA = new i, o.m_localAnchorB = new i, o.m_linearImpulse = new i, o.m_angularImpulse = 0, o.m_maxForce = 0, o.m_maxTorque = 0, o.m_indexA = 0, o.m_indexB = 0, o.m_rA = new i, o.m_rB = new i, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_linearMass = new s, o.m_angularMass = 0, o.m_qA = new r, o.m_qB = new r, o.m_lalcA = new i, o.m_lalcB = new i, o.m_K = new s, o.m_localAnchorA.Copy(e.localAnchorA), o.m_localAnchorB.Copy(e.localAnchorB), o.m_linearImpulse.SetZero(), o.m_maxForce = e.maxForce, o.m_maxTorque = e.maxTorque, o.m_linearMass.SetZero(), o
        }
        return __extends(b2FrictionJoint, t), b2FrictionJoint.prototype.InitVelocityConstraints = function (t) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var e = t.positions[this.m_indexA].a,
                o = t.velocities[this.m_indexA].v,
                s = t.velocities[this.m_indexA].w,
                n = t.positions[this.m_indexB].a,
                a = t.velocities[this.m_indexB].v,
                l = t.velocities[this.m_indexB].w,
                m = this.m_qA.SetAngle(e),
                _ = this.m_qB.SetAngle(n);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var h = r.MulRV(m, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var u = r.MulRV(_, this.m_lalcB, this.m_rB),
                c = this.m_invMassA,
                p = this.m_invMassB,
                f = this.m_invIA,
                d = this.m_invIB,
                y = this.m_K;
            if (y.ex.x = c + p + f * h.y * h.y + d * u.y * u.y, y.ex.y = -f * h.x * h.y - d * u.x * u.y, y.ey.x = y.ex.y, y.ey.y = c + p + f * h.x * h.x + d * u.x * u.x, y.GetInverse(this.m_linearMass), this.m_angularMass = f + d, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass), t.step.warmStarting) {
                this.m_linearImpulse.SelfMul(t.step.dtRatio), this.m_angularImpulse *= t.step.dtRatio;
                var b = this.m_linearImpulse;
                o.SelfMulSub(c, b), s -= f * (i.CrossVV(this.m_rA, b) + this.m_angularImpulse), a.SelfMulAdd(p, b), l += d * (i.CrossVV(this.m_rB, b) + this.m_angularImpulse)
            } else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0;
            t.velocities[this.m_indexA].w = s, t.velocities[this.m_indexB].w = l
        }, b2FrictionJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                n = t.velocities[this.m_indexB].v,
                r = t.velocities[this.m_indexB].w,
                a = this.m_invMassA,
                l = this.m_invMassB,
                m = this.m_invIA,
                _ = this.m_invIB,
                h = t.step.dt,
                u = r - o,
                c = -this.m_angularMass * u,
                p = this.m_angularImpulse,
                f = h * this.m_maxTorque;
            this.m_angularImpulse = b2Clamp(this.m_angularImpulse + c, -f, f), o -= m * (c = this.m_angularImpulse - p), r += _ * c;
            var d = i.SubVV(i.AddVCrossSV(n, r, this.m_rB, i.s_t0), i.AddVCrossSV(e, o, this.m_rA, i.s_t1), b2FrictionJoint.SolveVelocityConstraints_s_Cdot_v2),
                y = s.MulMV(this.m_linearMass, d, b2FrictionJoint.SolveVelocityConstraints_s_impulseV).SelfNeg(),
                b = b2FrictionJoint.SolveVelocityConstraints_s_oldImpulseV.Copy(this.m_linearImpulse);
            this.m_linearImpulse.SelfAdd(y);
            f = h * this.m_maxForce;
            this.m_linearImpulse.LengthSquared() > f * f && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.SelfMul(f)), i.SubVV(this.m_linearImpulse, b, y), e.SelfMulSub(a, y), o -= m * i.CrossVV(this.m_rA, y), n.SelfMulAdd(l, y), r += _ * i.CrossVV(this.m_rB, y), t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = r
        }, b2FrictionJoint.prototype.SolvePositionConstraints = function (t) {
            return !0
        }, b2FrictionJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2FrictionJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2FrictionJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * this.m_linearImpulse.x, t * this.m_linearImpulse.y)
        }, b2FrictionJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_angularImpulse
        }, b2FrictionJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2FrictionJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2FrictionJoint.prototype.SetMaxForce = function (t) {
            this.m_maxForce = t
        }, b2FrictionJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce
        }, b2FrictionJoint.prototype.SetMaxTorque = function (t) {
            this.m_maxTorque = t
        }, b2FrictionJoint.prototype.GetMaxTorque = function () {
            return this.m_maxTorque
        }, b2FrictionJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2FrictionJointDef = new b2FrictionJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.maxForce = %.15f;\n", this.m_maxForce), t("  jd.maxTorque = %.15f;\n", this.m_maxTorque), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2FrictionJoint.SolveVelocityConstraints_s_Cdot_v2 = new i, b2FrictionJoint.SolveVelocityConstraints_s_impulseV = new i, b2FrictionJoint.SolveVelocityConstraints_s_oldImpulseV = new i, b2FrictionJoint
    }(vt);
    t.b2FrictionJoint = Ft;
    var Rt = function (t) {
        function b2PrismaticJointDef() {
            var e = t.call(this, 2) || this;
            return e.localAnchorA = null, e.localAnchorB = null, e.localAxisA = null, e.referenceAngle = 0, e.enableLimit = !1, e.lowerTranslation = 0, e.upperTranslation = 0, e.enableMotor = !1, e.maxMotorForce = 0, e.motorSpeed = 0, e.localAnchorA = new i, e.localAnchorB = new i, e.localAxisA = new i(1, 0), e
        }
        return __extends(b2PrismaticJointDef, t), b2PrismaticJointDef.prototype.Initialize = function (t, e, i, o) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(i, this.localAnchorA), this.bodyB.GetLocalPoint(i, this.localAnchorB), this.bodyA.GetLocalVector(o, this.localAxisA), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }, b2PrismaticJointDef
    }(bt);
    t.b2PrismaticJointDef = Rt;
    var Jt = function (e) {
        function b2PrismaticJoint(t) {
            var a = e.call(this, t) || this;
            return a.m_localAnchorA = new i, a.m_localAnchorB = new i, a.m_localXAxisA = new i, a.m_localYAxisA = new i, a.m_referenceAngle = 0, a.m_impulse = new o(0, 0, 0), a.m_motorImpulse = 0, a.m_lowerTranslation = 0, a.m_upperTranslation = 0, a.m_maxMotorForce = 0, a.m_motorSpeed = 0, a.m_enableLimit = !1, a.m_enableMotor = !1, a.m_limitState = 0, a.m_indexA = 0, a.m_indexB = 0, a.m_localCenterA = new i, a.m_localCenterB = new i, a.m_invMassA = 0, a.m_invMassB = 0, a.m_invIA = 0, a.m_invIB = 0, a.m_axis = new i(0, 0), a.m_perp = new i(0, 0), a.m_s1 = 0, a.m_s2 = 0, a.m_a1 = 0, a.m_a2 = 0, a.m_K = new n, a.m_K3 = new n, a.m_K2 = new s, a.m_motorMass = 0, a.m_qA = new r, a.m_qB = new r, a.m_lalcA = new i, a.m_lalcB = new i, a.m_rA = new i, a.m_rB = new i, a.m_localAnchorA.Copy(t.localAnchorA), a.m_localAnchorB.Copy(t.localAnchorB), a.m_localXAxisA.Copy(t.localAxisA).SelfNormalize(), i.CrossOneV(a.m_localXAxisA, a.m_localYAxisA), a.m_referenceAngle = t.referenceAngle, a.m_lowerTranslation = t.lowerTranslation, a.m_upperTranslation = t.upperTranslation, a.m_maxMotorForce = t.maxMotorForce, a.m_motorSpeed = t.motorSpeed, a.m_enableLimit = t.enableLimit, a.m_enableMotor = t.enableMotor, a
        }
        return __extends(b2PrismaticJoint, e), b2PrismaticJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.velocities[this.m_indexA].v,
                a = e.velocities[this.m_indexA].w,
                l = e.positions[this.m_indexB].c,
                m = e.positions[this.m_indexB].a,
                _ = e.velocities[this.m_indexB].v,
                h = e.velocities[this.m_indexB].w,
                u = this.m_qA.SetAngle(s),
                c = this.m_qB.SetAngle(m);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var p = r.MulRV(u, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var f = r.MulRV(c, this.m_lalcB, this.m_rB),
                d = i.AddVV(i.SubVV(l, o, i.s_t0), i.SubVV(f, p, i.s_t1), b2PrismaticJoint.InitVelocityConstraints_s_d),
                y = this.m_invMassA,
                b = this.m_invMassB,
                v = this.m_invIA,
                S = this.m_invIB;
            if (r.MulRV(u, this.m_localXAxisA, this.m_axis), this.m_a1 = i.CrossVV(i.AddVV(d, p, i.s_t0), this.m_axis), this.m_a2 = i.CrossVV(f, this.m_axis), this.m_motorMass = y + b + v * this.m_a1 * this.m_a1 + S * this.m_a2 * this.m_a2, this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass), r.MulRV(u, this.m_localYAxisA, this.m_perp), this.m_s1 = i.CrossVV(i.AddVV(d, p, i.s_t0), this.m_perp), this.m_s2 = i.CrossVV(f, this.m_perp), this.m_K.ex.x = y + b + v * this.m_s1 * this.m_s1 + S * this.m_s2 * this.m_s2, this.m_K.ex.y = v * this.m_s1 + S * this.m_s2, this.m_K.ex.z = v * this.m_s1 * this.m_a1 + S * this.m_s2 * this.m_a2, this.m_K.ey.x = this.m_K.ex.y, this.m_K.ey.y = v + S, 0 === this.m_K.ey.y && (this.m_K.ey.y = 1), this.m_K.ey.z = v * this.m_a1 + S * this.m_a2, this.m_K.ez.x = this.m_K.ex.z, this.m_K.ez.y = this.m_K.ey.z, this.m_K.ez.z = y + b + v * this.m_a1 * this.m_a1 + S * this.m_a2 * this.m_a2, this.m_enableLimit) {
                var x = i.DotVV(this.m_axis, d);
                b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? this.m_limitState = 3 : x <= this.m_lowerTranslation ? 1 !== this.m_limitState && (this.m_limitState = 1, this.m_impulse.z = 0) : x >= this.m_upperTranslation ? 2 !== this.m_limitState && (this.m_limitState = 2, this.m_impulse.z = 0) : (this.m_limitState = 0, this.m_impulse.z = 0)
            } else this.m_limitState = 0, this.m_impulse.z = 0; if (this.m_enableMotor || (this.m_motorImpulse = 0), e.step.warmStarting) {
                this.m_impulse.SelfMul(e.step.dtRatio), this.m_motorImpulse *= e.step.dtRatio;
                var C = i.AddVV(i.MulSV(this.m_impulse.x, this.m_perp, i.s_t0), i.MulSV(this.m_motorImpulse + this.m_impulse.z, this.m_axis, i.s_t1), b2PrismaticJoint.InitVelocityConstraints_s_P),
                    A = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1,
                    B = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
                n.SelfMulSub(y, C), a -= v * A, _.SelfMulAdd(b, C), h += S * B
            } else this.m_impulse.SetZero(), this.m_motorImpulse = 0;
            e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = h
        }, b2PrismaticJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = this.m_invMassA,
                a = this.m_invMassB,
                l = this.m_invIA,
                m = this.m_invIB;
            if (this.m_enableMotor && 3 !== this.m_limitState) {
                var _ = i.DotVV(this.m_axis, i.SubVV(s, e, i.s_t0)) + this.m_a2 * n - this.m_a1 * o,
                    h = this.m_motorMass * (this.m_motorSpeed - _),
                    u = this.m_motorImpulse,
                    c = t.step.dt * this.m_maxMotorForce;
                this.m_motorImpulse = b2Clamp(this.m_motorImpulse + h, -c, c), h = this.m_motorImpulse - u;
                var p = i.MulSV(h, this.m_axis, b2PrismaticJoint.SolveVelocityConstraints_s_P),
                    f = h * this.m_a1,
                    d = h * this.m_a2;
                e.SelfMulSub(r, p), o -= l * f, s.SelfMulAdd(a, p), n += m * d
            }
            var y = i.DotVV(this.m_perp, i.SubVV(s, e, i.s_t0)) + this.m_s2 * n - this.m_s1 * o,
                b = n - o;
            if (this.m_enableLimit && 0 !== this.m_limitState) {
                var v = i.DotVV(this.m_axis, i.SubVV(s, e, i.s_t0)) + this.m_a2 * n - this.m_a1 * o,
                    S = b2PrismaticJoint.SolveVelocityConstraints_s_f1.Copy(this.m_impulse),
                    x = this.m_K.Solve33(-y, -b, -v, b2PrismaticJoint.SolveVelocityConstraints_s_df3);
                this.m_impulse.SelfAdd(x), 1 === this.m_limitState ? this.m_impulse.z = b2Max(this.m_impulse.z, 0) : 2 === this.m_limitState && (this.m_impulse.z = b2Min(this.m_impulse.z, 0));
                var C = -y - (this.m_impulse.z - S.z) * this.m_K.ez.x,
                    A = -b - (this.m_impulse.z - S.z) * this.m_K.ez.y,
                    B = this.m_K.Solve22(C, A, b2PrismaticJoint.SolveVelocityConstraints_s_f2r);
                B.x += S.x, B.y += S.y, this.m_impulse.x = B.x, this.m_impulse.y = B.y, x.x = this.m_impulse.x - S.x, x.y = this.m_impulse.y - S.y, x.z = this.m_impulse.z - S.z;
                p = i.AddVV(i.MulSV(x.x, this.m_perp, i.s_t0), i.MulSV(x.z, this.m_axis, i.s_t1), b2PrismaticJoint.SolveVelocityConstraints_s_P), f = x.x * this.m_s1 + x.y + x.z * this.m_a1, d = x.x * this.m_s2 + x.y + x.z * this.m_a2;
                e.SelfMulSub(r, p), o -= l * f, s.SelfMulAdd(a, p), n += m * d
            } else {
                var V = this.m_K.Solve22(-y, -b, b2PrismaticJoint.SolveVelocityConstraints_s_df2);
                this.m_impulse.x += V.x, this.m_impulse.y += V.y;
                p = i.MulSV(V.x, this.m_perp, b2PrismaticJoint.SolveVelocityConstraints_s_P), f = V.x * this.m_s1 + V.y, d = V.x * this.m_s2 + V.y;
                e.SelfMulSub(r, p), o -= l * f, s.SelfMulAdd(a, p), n += m * d
            }
            t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n
        }, b2PrismaticJoint.prototype.SolvePositionConstraints = function (e) {
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = this.m_qA.SetAngle(s),
                m = this.m_qB.SetAngle(a),
                _ = this.m_invMassA,
                h = this.m_invMassB,
                u = this.m_invIA,
                c = this.m_invIB,
                p = r.MulRV(l, this.m_lalcA, this.m_rA),
                f = r.MulRV(m, this.m_lalcB, this.m_rB),
                d = i.SubVV(i.AddVV(n, f, i.s_t0), i.AddVV(o, p, i.s_t1), b2PrismaticJoint.SolvePositionConstraints_s_d),
                y = r.MulRV(l, this.m_localXAxisA, this.m_axis),
                b = i.CrossVV(i.AddVV(d, p, i.s_t0), y),
                v = i.CrossVV(f, y),
                S = r.MulRV(l, this.m_localYAxisA, this.m_perp),
                x = i.CrossVV(i.AddVV(d, p, i.s_t0), S),
                C = i.CrossVV(f, S),
                A = b2PrismaticJoint.SolvePositionConstraints_s_impulse,
                B = i.DotVV(S, d),
                V = a - s - this.m_referenceAngle,
                g = b2Abs(B),
                P = b2Abs(V),
                w = !1,
                M = 0;
            if (this.m_enableLimit) {
                var I = i.DotVV(y, d);
                b2Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * t.b2_linearSlop ? (M = b2Clamp(I, -t.b2_maxLinearCorrection, t.b2_maxLinearCorrection), g = b2Max(g, b2Abs(I)), w = !0) : I <= this.m_lowerTranslation ? (M = b2Clamp(I - this.m_lowerTranslation + t.b2_linearSlop, -t.b2_maxLinearCorrection, 0), g = b2Max(g, this.m_lowerTranslation - I), w = !0) : I >= this.m_upperTranslation && (M = b2Clamp(I - this.m_upperTranslation - t.b2_linearSlop, 0, t.b2_maxLinearCorrection), g = b2Max(g, I - this.m_upperTranslation), w = !0)
            }
            if (w) {
                var D = _ + h + u * x * x + c * C * C,
                    G = u * x + c * C,
                    F = u * x * b + c * C * v;
                0 === (L = u + c) && (L = 1);
                var R = u * b + c * v,
                    J = _ + h + u * b * b + c * v * v,
                    T = this.m_K3;
                T.ex.SetXYZ(D, G, F), T.ey.SetXYZ(G, L, R), T.ez.SetXYZ(F, R, J), A = T.Solve33(-B, -V, -M, A)
            } else {
                var L;
                D = _ + h + u * x * x + c * C * C, G = u * x + c * C;
                0 === (L = u + c) && (L = 1);
                var k = this.m_K2;
                k.ex.Set(D, G), k.ey.Set(G, L);
                var q = k.Solve(-B, -V, b2PrismaticJoint.SolvePositionConstraints_s_impulse1);
                A.x = q.x, A.y = q.y, A.z = 0
            }
            var z = i.AddVV(i.MulSV(A.x, S, i.s_t0), i.MulSV(A.z, y, i.s_t1), b2PrismaticJoint.SolvePositionConstraints_s_P),
                W = A.x * x + A.y + A.z * b,
                E = A.x * C + A.y + A.z * v;
            return o.SelfMulSub(_, z), s -= u * W, n.SelfMulAdd(h, z), a += c * E, e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, g <= t.b2_linearSlop && P <= t.b2_angularSlop
        }, b2PrismaticJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2PrismaticJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2PrismaticJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), t * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
        }, b2PrismaticJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_impulse.y
        }, b2PrismaticJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2PrismaticJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2PrismaticJoint.prototype.GetLocalAxisA = function () {
            return this.m_localXAxisA
        }, b2PrismaticJoint.prototype.GetReferenceAngle = function () {
            return this.m_referenceAngle
        }, b2PrismaticJoint.prototype.GetJointTranslation = function () {
            var t = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, b2PrismaticJoint.GetJointTranslation_s_pA),
                e = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, b2PrismaticJoint.GetJointTranslation_s_pB),
                o = i.SubVV(e, t, b2PrismaticJoint.GetJointTranslation_s_d),
                s = this.m_bodyA.GetWorldVector(this.m_localXAxisA, b2PrismaticJoint.GetJointTranslation_s_axis);
            return i.DotVV(o, s)
        }, b2PrismaticJoint.prototype.GetJointSpeed = function () {
            var t = this.m_bodyA,
                e = this.m_bodyB;
            i.SubVV(this.m_localAnchorA, t.m_sweep.localCenter, this.m_lalcA);
            var o = r.MulRV(t.m_xf.q, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, e.m_sweep.localCenter, this.m_lalcB);
            var s = r.MulRV(e.m_xf.q, this.m_lalcB, this.m_rB),
                n = i.AddVV(t.m_sweep.c, o, i.s_t0),
                a = i.AddVV(e.m_sweep.c, s, i.s_t1),
                l = i.SubVV(a, n, i.s_t2),
                m = t.GetWorldVector(this.m_localXAxisA, this.m_axis),
                _ = t.m_linearVelocity,
                h = e.m_linearVelocity,
                u = t.m_angularVelocity,
                c = e.m_angularVelocity;
            return i.DotVV(l, i.CrossSV(u, m, i.s_t0)) + i.DotVV(m, i.SubVV(i.AddVCrossSV(h, c, s, i.s_t0), i.AddVCrossSV(_, u, o, i.s_t1), i.s_t0))
        }, b2PrismaticJoint.prototype.IsLimitEnabled = function () {
            return this.m_enableLimit
        }, b2PrismaticJoint.prototype.EnableLimit = function (t) {
            t !== this.m_enableLimit && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = t, this.m_impulse.z = 0)
        }, b2PrismaticJoint.prototype.GetLowerLimit = function () {
            return this.m_lowerTranslation
        }, b2PrismaticJoint.prototype.GetUpperLimit = function () {
            return this.m_upperTranslation
        }, b2PrismaticJoint.prototype.SetLimits = function (t, e) {
            t === this.m_lowerTranslation && e === this.m_upperTranslation || (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_lowerTranslation = t, this.m_upperTranslation = e, this.m_impulse.z = 0)
        }, b2PrismaticJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor
        }, b2PrismaticJoint.prototype.EnableMotor = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = t
        }, b2PrismaticJoint.prototype.SetMotorSpeed = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t
        }, b2PrismaticJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed
        }, b2PrismaticJoint.prototype.SetMaxMotorForce = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorForce = t
        }, b2PrismaticJoint.prototype.GetMaxMotorForce = function () {
            return this.m_maxMotorForce
        }, b2PrismaticJoint.prototype.GetMotorForce = function (t) {
            return t * this.m_motorImpulse
        }, b2PrismaticJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2PrismaticJointDef = new b2PrismaticJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y), t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), t("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false"), t("  jd.lowerTranslation = %.15f;\n", this.m_lowerTranslation), t("  jd.upperTranslation = %.15f;\n", this.m_upperTranslation), t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), t("  jd.maxMotorForce = %.15f;\n", this.m_maxMotorForce), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2PrismaticJoint.InitVelocityConstraints_s_d = new i, b2PrismaticJoint.InitVelocityConstraints_s_P = new i, b2PrismaticJoint.SolveVelocityConstraints_s_P = new i, b2PrismaticJoint.SolveVelocityConstraints_s_f2r = new i, b2PrismaticJoint.SolveVelocityConstraints_s_f1 = new o, b2PrismaticJoint.SolveVelocityConstraints_s_df3 = new o, b2PrismaticJoint.SolveVelocityConstraints_s_df2 = new i, b2PrismaticJoint.SolvePositionConstraints_s_d = new i, b2PrismaticJoint.SolvePositionConstraints_s_impulse = new o, b2PrismaticJoint.SolvePositionConstraints_s_impulse1 = new i, b2PrismaticJoint.SolvePositionConstraints_s_P = new i, b2PrismaticJoint.GetJointTranslation_s_pA = new i, b2PrismaticJoint.GetJointTranslation_s_pB = new i, b2PrismaticJoint.GetJointTranslation_s_d = new i, b2PrismaticJoint.GetJointTranslation_s_axis = new i, b2PrismaticJoint
    }(vt);
    t.b2PrismaticJoint = Jt;
    var Tt = function (t) {
        function b2RevoluteJointDef() {
            var e = t.call(this, 1) || this;
            return e.localAnchorA = new i(0, 0), e.localAnchorB = new i(0, 0), e.referenceAngle = 0, e.enableLimit = !1, e.lowerAngle = 0, e.upperAngle = 0, e.enableMotor = !1, e.motorSpeed = 0, e.maxMotorTorque = 0, e
        }
        return __extends(b2RevoluteJointDef, t), b2RevoluteJointDef.prototype.Initialize = function (t, e, i) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(i, this.localAnchorA), this.bodyB.GetLocalPoint(i, this.localAnchorB), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }, b2RevoluteJointDef
    }(bt);
    t.b2RevoluteJointDef = Tt;
    var Lt = function (e) {
        function b2RevoluteJoint(t) {
            var a = e.call(this, t) || this;
            return a.m_localAnchorA = new i, a.m_localAnchorB = new i, a.m_impulse = new o, a.m_motorImpulse = 0, a.m_enableMotor = !1, a.m_maxMotorTorque = 0, a.m_motorSpeed = 0, a.m_enableLimit = !1, a.m_referenceAngle = 0, a.m_lowerAngle = 0, a.m_upperAngle = 0, a.m_indexA = 0, a.m_indexB = 0, a.m_rA = new i, a.m_rB = new i, a.m_localCenterA = new i, a.m_localCenterB = new i, a.m_invMassA = 0, a.m_invMassB = 0, a.m_invIA = 0, a.m_invIB = 0, a.m_mass = new n, a.m_motorMass = 0, a.m_limitState = 0, a.m_qA = new r, a.m_qB = new r, a.m_lalcA = new i, a.m_lalcB = new i, a.m_K = new s, a.m_localAnchorA.Copy(t.localAnchorA), a.m_localAnchorB.Copy(t.localAnchorB), a.m_referenceAngle = t.referenceAngle, a.m_impulse.SetZero(), a.m_motorImpulse = 0, a.m_lowerAngle = t.lowerAngle, a.m_upperAngle = t.upperAngle, a.m_maxMotorTorque = t.maxMotorTorque, a.m_motorSpeed = t.motorSpeed, a.m_enableLimit = t.enableLimit, a.m_enableMotor = t.enableMotor, a.m_limitState = 0, a
        }
        return __extends(b2RevoluteJoint, e), b2RevoluteJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].a,
                s = e.velocities[this.m_indexA].v,
                n = e.velocities[this.m_indexA].w,
                a = e.positions[this.m_indexB].a,
                l = e.velocities[this.m_indexB].v,
                m = e.velocities[this.m_indexB].w,
                _ = this.m_qA.SetAngle(o),
                h = this.m_qB.SetAngle(a);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), r.MulRV(_, this.m_lalcA, this.m_rA), i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(h, this.m_lalcB, this.m_rB);
            var u = this.m_invMassA,
                c = this.m_invMassB,
                p = this.m_invIA,
                f = this.m_invIB,
                d = p + f === 0;
            if (this.m_mass.ex.x = u + c + this.m_rA.y * this.m_rA.y * p + this.m_rB.y * this.m_rB.y * f, this.m_mass.ey.x = -this.m_rA.y * this.m_rA.x * p - this.m_rB.y * this.m_rB.x * f, this.m_mass.ez.x = -this.m_rA.y * p - this.m_rB.y * f, this.m_mass.ex.y = this.m_mass.ey.x, this.m_mass.ey.y = u + c + this.m_rA.x * this.m_rA.x * p + this.m_rB.x * this.m_rB.x * f, this.m_mass.ez.y = this.m_rA.x * p + this.m_rB.x * f, this.m_mass.ex.z = this.m_mass.ez.x, this.m_mass.ey.z = this.m_mass.ez.y, this.m_mass.ez.z = p + f, this.m_motorMass = p + f, this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass), this.m_enableMotor && !d || (this.m_motorImpulse = 0), this.m_enableLimit && !d) {
                var y = a - o - this.m_referenceAngle;
                b2Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * t.b2_angularSlop ? this.m_limitState = 3 : y <= this.m_lowerAngle ? (1 !== this.m_limitState && (this.m_impulse.z = 0), this.m_limitState = 1) : y >= this.m_upperAngle ? (2 !== this.m_limitState && (this.m_impulse.z = 0), this.m_limitState = 2) : (this.m_limitState = 0, this.m_impulse.z = 0)
            } else this.m_limitState = 0; if (e.step.warmStarting) {
                this.m_impulse.SelfMul(e.step.dtRatio), this.m_motorImpulse *= e.step.dtRatio;
                var b = b2RevoluteJoint.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
                s.SelfMulSub(u, b), n -= p * (i.CrossVV(this.m_rA, b) + this.m_motorImpulse + this.m_impulse.z), l.SelfMulAdd(c, b), m += f * (i.CrossVV(this.m_rB, b) + this.m_motorImpulse + this.m_impulse.z)
            } else this.m_impulse.SetZero(), this.m_motorImpulse = 0;
            e.velocities[this.m_indexA].w = n, e.velocities[this.m_indexB].w = m
        }, b2RevoluteJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = this.m_invMassA,
                a = this.m_invMassB,
                l = this.m_invIA,
                m = this.m_invIB,
                _ = l + m === 0;
            if (this.m_enableMotor && 3 !== this.m_limitState && !_) {
                var h = n - o - this.m_motorSpeed,
                    u = -this.m_motorMass * h,
                    c = this.m_motorImpulse,
                    p = t.step.dt * this.m_maxMotorTorque;
                this.m_motorImpulse = b2Clamp(this.m_motorImpulse + u, -p, p), o -= l * (u = this.m_motorImpulse - c), n += m * u
            }
            if (this.m_enableLimit && 0 !== this.m_limitState && !_) {
                var f = i.SubVV(i.AddVCrossSV(s, n, this.m_rB, i.s_t0), i.AddVCrossSV(e, o, this.m_rA, i.s_t1), b2RevoluteJoint.SolveVelocityConstraints_s_Cdot1),
                    d = n - o,
                    y = this.m_mass.Solve33(f.x, f.y, d, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v3).SelfNeg();
                if (3 === this.m_limitState) this.m_impulse.SelfAdd(y);
                else if (1 === this.m_limitState) {
                    if (this.m_impulse.z + y.z < 0) {
                        var b = -f.x + this.m_impulse.z * this.m_mass.ez.x,
                            v = -f.y + this.m_impulse.z * this.m_mass.ez.y,
                            S = this.m_mass.Solve22(b, v, b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2);
                        y.x = S.x, y.y = S.y, y.z = -this.m_impulse.z, this.m_impulse.x += S.x, this.m_impulse.y += S.y, this.m_impulse.z = 0
                    } else this.m_impulse.SelfAdd(y)
                } else if (2 === this.m_limitState) {
                    if (this.m_impulse.z + y.z > 0) {
                        b = -f.x + this.m_impulse.z * this.m_mass.ez.x, v = -f.y + this.m_impulse.z * this.m_mass.ez.y, S = this.m_mass.Solve22(b, v, b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2);
                        y.x = S.x, y.y = S.y, y.z = -this.m_impulse.z, this.m_impulse.x += S.x, this.m_impulse.y += S.y, this.m_impulse.z = 0
                    } else this.m_impulse.SelfAdd(y)
                }
                var x = b2RevoluteJoint.SolveVelocityConstraints_s_P.Set(y.x, y.y);
                e.SelfMulSub(r, x), o -= l * (i.CrossVV(this.m_rA, x) + y.z), s.SelfMulAdd(a, x), n += m * (i.CrossVV(this.m_rB, x) + y.z)
            } else {
                var C = i.SubVV(i.AddVCrossSV(s, n, this.m_rB, i.s_t0), i.AddVCrossSV(e, o, this.m_rA, i.s_t1), b2RevoluteJoint.SolveVelocityConstraints_s_Cdot_v2),
                    A = this.m_mass.Solve22(-C.x, -C.y, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v2);
                this.m_impulse.x += A.x, this.m_impulse.y += A.y, e.SelfMulSub(r, A), o -= l * i.CrossVV(this.m_rA, A), s.SelfMulAdd(a, A), n += m * i.CrossVV(this.m_rB, A)
            }
            t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n
        }, b2RevoluteJoint.prototype.SolvePositionConstraints = function (e) {
            var o, s = e.positions[this.m_indexA].c,
                n = e.positions[this.m_indexA].a,
                a = e.positions[this.m_indexB].c,
                l = e.positions[this.m_indexB].a,
                m = this.m_qA.SetAngle(n),
                _ = this.m_qB.SetAngle(l),
                h = 0,
                u = this.m_invIA + this.m_invIB === 0;
            if (this.m_enableLimit && 0 !== this.m_limitState && !u) {
                var c = l - n - this.m_referenceAngle,
                    p = 0;
                if (3 === this.m_limitState) {
                    var f = b2Clamp(c - this.m_lowerAngle, -t.b2_maxAngularCorrection, t.b2_maxAngularCorrection);
                    p = -this.m_motorMass * f, h = b2Abs(f)
                } else if (1 === this.m_limitState) {
                    h = -(f = c - this.m_lowerAngle), f = b2Clamp(f + t.b2_angularSlop, -t.b2_maxAngularCorrection, 0), p = -this.m_motorMass * f
                } else if (2 === this.m_limitState) {
                    h = f = c - this.m_upperAngle, f = b2Clamp(f - t.b2_angularSlop, 0, t.b2_maxAngularCorrection), p = -this.m_motorMass * f
                }
                n -= this.m_invIA * p, l += this.m_invIB * p
            }
            m.SetAngle(n), _.SetAngle(l), i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var d = r.MulRV(m, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var y = r.MulRV(_, this.m_lalcB, this.m_rB),
                b = i.SubVV(i.AddVV(a, y, i.s_t0), i.AddVV(s, d, i.s_t1), b2RevoluteJoint.SolvePositionConstraints_s_C_v2);
            o = b.Length();
            var v = this.m_invMassA,
                S = this.m_invMassB,
                x = this.m_invIA,
                C = this.m_invIB,
                A = this.m_K;
            A.ex.x = v + S + x * d.y * d.y + C * y.y * y.y, A.ex.y = -x * d.x * d.y - C * y.x * y.y, A.ey.x = A.ex.y, A.ey.y = v + S + x * d.x * d.x + C * y.x * y.x;
            var B = A.Solve(b.x, b.y, b2RevoluteJoint.SolvePositionConstraints_s_impulse).SelfNeg();
            return s.SelfMulSub(v, B), n -= x * i.CrossVV(d, B), a.SelfMulAdd(S, B), l += C * i.CrossVV(y, B), e.positions[this.m_indexA].a = n, e.positions[this.m_indexB].a = l, o <= t.b2_linearSlop && h <= t.b2_angularSlop
        }, b2RevoluteJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2RevoluteJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2RevoluteJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * this.m_impulse.x, t * this.m_impulse.y)
        }, b2RevoluteJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_impulse.z
        }, b2RevoluteJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2RevoluteJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2RevoluteJoint.prototype.GetReferenceAngle = function () {
            return this.m_referenceAngle
        }, b2RevoluteJoint.prototype.GetJointAngle = function () {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
        }, b2RevoluteJoint.prototype.GetJointSpeed = function () {
            return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
        }, b2RevoluteJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor
        }, b2RevoluteJoint.prototype.EnableMotor = function (t) {
            this.m_enableMotor !== t && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = t)
        }, b2RevoluteJoint.prototype.GetMotorTorque = function (t) {
            return t * this.m_motorImpulse
        }, b2RevoluteJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed
        }, b2RevoluteJoint.prototype.SetMaxMotorTorque = function (t) {
            this.m_maxMotorTorque = t
        }, b2RevoluteJoint.prototype.GetMaxMotorTorque = function () {
            return this.m_maxMotorTorque
        }, b2RevoluteJoint.prototype.IsLimitEnabled = function () {
            return this.m_enableLimit
        }, b2RevoluteJoint.prototype.EnableLimit = function (t) {
            t !== this.m_enableLimit && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableLimit = t, this.m_impulse.z = 0)
        }, b2RevoluteJoint.prototype.GetLowerLimit = function () {
            return this.m_lowerAngle
        }, b2RevoluteJoint.prototype.GetUpperLimit = function () {
            return this.m_upperAngle
        }, b2RevoluteJoint.prototype.SetLimits = function (t, e) {
            t === this.m_lowerAngle && e === this.m_upperAngle || (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_impulse.z = 0, this.m_lowerAngle = t, this.m_upperAngle = e)
        }, b2RevoluteJoint.prototype.SetMotorSpeed = function (t) {
            this.m_motorSpeed !== t && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t)
        }, b2RevoluteJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2RevoluteJointDef = new b2RevoluteJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), t("  jd.enableLimit = %s;\n", this.m_enableLimit ? "true" : "false"), t("  jd.lowerAngle = %.15f;\n", this.m_lowerAngle), t("  jd.upperAngle = %.15f;\n", this.m_upperAngle), t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), t("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2RevoluteJoint.InitVelocityConstraints_s_P = new i, b2RevoluteJoint.SolveVelocityConstraints_s_P = new i, b2RevoluteJoint.SolveVelocityConstraints_s_Cdot_v2 = new i, b2RevoluteJoint.SolveVelocityConstraints_s_Cdot1 = new i, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v3 = new o, b2RevoluteJoint.SolveVelocityConstraints_s_reduced_v2 = new i, b2RevoluteJoint.SolveVelocityConstraints_s_impulse_v2 = new i, b2RevoluteJoint.SolvePositionConstraints_s_C_v2 = new i, b2RevoluteJoint.SolvePositionConstraints_s_impulse = new i, b2RevoluteJoint
    }(vt);
    t.b2RevoluteJoint = Lt;
    var kt = function (t) {
        function b2GearJointDef() {
            var e = t.call(this, 6) || this;
            return e.joint1 = null, e.joint2 = null, e.ratio = 1, e
        }
        return __extends(b2GearJointDef, t), b2GearJointDef
    }(bt);
    t.b2GearJointDef = kt;
    var qt = function (e) {
        function b2GearJoint(t) {
            var o, s, n = e.call(this, t) || this;
            n.m_joint1 = null, n.m_joint2 = null, n.m_typeA = 0, n.m_typeB = 0, n.m_bodyC = null, n.m_bodyD = null, n.m_localAnchorA = new i, n.m_localAnchorB = new i, n.m_localAnchorC = new i, n.m_localAnchorD = new i, n.m_localAxisC = new i, n.m_localAxisD = new i, n.m_referenceAngleA = 0, n.m_referenceAngleB = 0, n.m_constant = 0, n.m_ratio = 0, n.m_impulse = 0, n.m_indexA = 0, n.m_indexB = 0, n.m_indexC = 0, n.m_indexD = 0, n.m_lcA = new i, n.m_lcB = new i, n.m_lcC = new i, n.m_lcD = new i, n.m_mA = 0, n.m_mB = 0, n.m_mC = 0, n.m_mD = 0, n.m_iA = 0, n.m_iB = 0, n.m_iC = 0, n.m_iD = 0, n.m_JvAC = new i, n.m_JvBD = new i, n.m_JwA = 0, n.m_JwB = 0, n.m_JwC = 0, n.m_JwD = 0, n.m_mass = 0, n.m_qA = new r, n.m_qB = new r, n.m_qC = new r, n.m_qD = new r, n.m_lalcA = new i, n.m_lalcB = new i, n.m_lalcC = new i, n.m_lalcD = new i, n.m_joint1 = t.joint1, n.m_joint2 = t.joint2, n.m_typeA = n.m_joint1.GetType(), n.m_typeB = n.m_joint2.GetType(), n.m_bodyC = n.m_joint1.GetBodyA(), n.m_bodyA = n.m_joint1.GetBodyB();
            var a = n.m_bodyA.m_xf,
                l = n.m_bodyA.m_sweep.a,
                m = n.m_bodyC.m_xf,
                _ = n.m_bodyC.m_sweep.a;
            if (1 === n.m_typeA) {
                var h = t.joint1;
                n.m_localAnchorC.Copy(h.m_localAnchorA), n.m_localAnchorA.Copy(h.m_localAnchorB), n.m_referenceAngleA = h.m_referenceAngle, n.m_localAxisC.SetZero(), o = l - _ - n.m_referenceAngleA
            } else {
                var u = t.joint1;
                n.m_localAnchorC.Copy(u.m_localAnchorA), n.m_localAnchorA.Copy(u.m_localAnchorB), n.m_referenceAngleA = u.m_referenceAngle, n.m_localAxisC.Copy(u.m_localXAxisA);
                var c = n.m_localAnchorC,
                    p = r.MulTRV(m.q, i.AddVV(r.MulRV(a.q, n.m_localAnchorA, i.s_t0), i.SubVV(a.p, m.p, i.s_t1), i.s_t0), i.s_t0);
                o = i.DotVV(i.SubVV(p, c, i.s_t0), n.m_localAxisC)
            }
            n.m_bodyD = n.m_joint2.GetBodyA(), n.m_bodyB = n.m_joint2.GetBodyB();
            var f = n.m_bodyB.m_xf,
                d = n.m_bodyB.m_sweep.a,
                y = n.m_bodyD.m_xf,
                b = n.m_bodyD.m_sweep.a;
            if (1 === n.m_typeB) {
                h = t.joint2;
                n.m_localAnchorD.Copy(h.m_localAnchorA), n.m_localAnchorB.Copy(h.m_localAnchorB), n.m_referenceAngleB = h.m_referenceAngle, n.m_localAxisD.SetZero(), s = d - b - n.m_referenceAngleB
            } else {
                u = t.joint2;
                n.m_localAnchorD.Copy(u.m_localAnchorA), n.m_localAnchorB.Copy(u.m_localAnchorB), n.m_referenceAngleB = u.m_referenceAngle, n.m_localAxisD.Copy(u.m_localXAxisA);
                var v = n.m_localAnchorD,
                    S = r.MulTRV(y.q, i.AddVV(r.MulRV(f.q, n.m_localAnchorB, i.s_t0), i.SubVV(f.p, y.p, i.s_t1), i.s_t0), i.s_t0);
                s = i.DotVV(i.SubVV(S, v, i.s_t0), n.m_localAxisD)
            }
            return n.m_ratio = t.ratio, n.m_constant = o + n.m_ratio * s, n.m_impulse = 0, n
        }
        return __extends(b2GearJoint, e), b2GearJoint.prototype.InitVelocityConstraints = function (t) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_indexC = this.m_bodyC.m_islandIndex, this.m_indexD = this.m_bodyD.m_islandIndex, this.m_lcA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_lcB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_lcC.Copy(this.m_bodyC.m_sweep.localCenter), this.m_lcD.Copy(this.m_bodyD.m_sweep.localCenter), this.m_mA = this.m_bodyA.m_invMass, this.m_mB = this.m_bodyB.m_invMass, this.m_mC = this.m_bodyC.m_invMass, this.m_mD = this.m_bodyD.m_invMass, this.m_iA = this.m_bodyA.m_invI, this.m_iB = this.m_bodyB.m_invI, this.m_iC = this.m_bodyC.m_invI, this.m_iD = this.m_bodyD.m_invI;
            var e = t.positions[this.m_indexA].a,
                o = t.velocities[this.m_indexA].v,
                s = t.velocities[this.m_indexA].w,
                n = t.positions[this.m_indexB].a,
                a = t.velocities[this.m_indexB].v,
                l = t.velocities[this.m_indexB].w,
                m = t.positions[this.m_indexC].a,
                _ = t.velocities[this.m_indexC].v,
                h = t.velocities[this.m_indexC].w,
                u = t.positions[this.m_indexD].a,
                c = t.velocities[this.m_indexD].v,
                p = t.velocities[this.m_indexD].w,
                f = this.m_qA.SetAngle(e),
                d = this.m_qB.SetAngle(n),
                y = this.m_qC.SetAngle(m),
                b = this.m_qD.SetAngle(u);
            if (this.m_mass = 0, 1 === this.m_typeA) this.m_JvAC.SetZero(), this.m_JwA = 1, this.m_JwC = 1, this.m_mass += this.m_iA + this.m_iC;
            else {
                var v = r.MulRV(y, this.m_localAxisC, b2GearJoint.InitVelocityConstraints_s_u);
                i.SubVV(this.m_localAnchorC, this.m_lcC, this.m_lalcC);
                var S = r.MulRV(y, this.m_lalcC, b2GearJoint.InitVelocityConstraints_s_rC);
                i.SubVV(this.m_localAnchorA, this.m_lcA, this.m_lalcA);
                var x = r.MulRV(f, this.m_lalcA, b2GearJoint.InitVelocityConstraints_s_rA);
                this.m_JvAC.Copy(v), this.m_JwC = i.CrossVV(S, v), this.m_JwA = i.CrossVV(x, v), this.m_mass += this.m_mC + this.m_mA + this.m_iC * this.m_JwC * this.m_JwC + this.m_iA * this.m_JwA * this.m_JwA
            } if (1 === this.m_typeB) this.m_JvBD.SetZero(), this.m_JwB = this.m_ratio, this.m_JwD = this.m_ratio, this.m_mass += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD);
            else {
                v = r.MulRV(b, this.m_localAxisD, b2GearJoint.InitVelocityConstraints_s_u);
                i.SubVV(this.m_localAnchorD, this.m_lcD, this.m_lalcD);
                var C = r.MulRV(b, this.m_lalcD, b2GearJoint.InitVelocityConstraints_s_rD);
                i.SubVV(this.m_localAnchorB, this.m_lcB, this.m_lalcB);
                var A = r.MulRV(d, this.m_lalcB, b2GearJoint.InitVelocityConstraints_s_rB);
                i.MulSV(this.m_ratio, v, this.m_JvBD), this.m_JwD = this.m_ratio * i.CrossVV(C, v), this.m_JwB = this.m_ratio * i.CrossVV(A, v), this.m_mass += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * this.m_JwD * this.m_JwD + this.m_iB * this.m_JwB * this.m_JwB
            }
            this.m_mass = this.m_mass > 0 ? 1 / this.m_mass : 0, t.step.warmStarting ? (o.SelfMulAdd(this.m_mA * this.m_impulse, this.m_JvAC), s += this.m_iA * this.m_impulse * this.m_JwA, a.SelfMulAdd(this.m_mB * this.m_impulse, this.m_JvBD), l += this.m_iB * this.m_impulse * this.m_JwB, _.SelfMulSub(this.m_mC * this.m_impulse, this.m_JvAC), h -= this.m_iC * this.m_impulse * this.m_JwC, c.SelfMulSub(this.m_mD * this.m_impulse, this.m_JvBD), p -= this.m_iD * this.m_impulse * this.m_JwD) : this.m_impulse = 0, t.velocities[this.m_indexA].w = s, t.velocities[this.m_indexB].w = l, t.velocities[this.m_indexC].w = h, t.velocities[this.m_indexD].w = p
        }, b2GearJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = t.velocities[this.m_indexC].v,
                a = t.velocities[this.m_indexC].w,
                l = t.velocities[this.m_indexD].v,
                m = t.velocities[this.m_indexD].w,
                _ = i.DotVV(this.m_JvAC, i.SubVV(e, r, i.s_t0)) + i.DotVV(this.m_JvBD, i.SubVV(s, l, i.s_t0));
            _ += this.m_JwA * o - this.m_JwC * a + (this.m_JwB * n - this.m_JwD * m);
            var h = -this.m_mass * _;
            this.m_impulse += h, e.SelfMulAdd(this.m_mA * h, this.m_JvAC), o += this.m_iA * h * this.m_JwA, s.SelfMulAdd(this.m_mB * h, this.m_JvBD), n += this.m_iB * h * this.m_JwB, r.SelfMulSub(this.m_mC * h, this.m_JvAC), a -= this.m_iC * h * this.m_JwC, l.SelfMulSub(this.m_mD * h, this.m_JvBD), m -= this.m_iD * h * this.m_JwD, t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n, t.velocities[this.m_indexC].w = a, t.velocities[this.m_indexD].w = m
        }, b2GearJoint.prototype.SolvePositionConstraints = function (e) {
            var o, s, n, a, l, m, _ = e.positions[this.m_indexA].c,
                h = e.positions[this.m_indexA].a,
                u = e.positions[this.m_indexB].c,
                c = e.positions[this.m_indexB].a,
                p = e.positions[this.m_indexC].c,
                f = e.positions[this.m_indexC].a,
                d = e.positions[this.m_indexD].c,
                y = e.positions[this.m_indexD].a,
                b = this.m_qA.SetAngle(h),
                v = this.m_qB.SetAngle(c),
                S = this.m_qC.SetAngle(f),
                x = this.m_qD.SetAngle(y),
                C = this.m_JvAC,
                A = this.m_JvBD,
                B = 0;
            if (1 === this.m_typeA) C.SetZero(), n = 1, l = 1, B += this.m_iA + this.m_iC, o = h - f - this.m_referenceAngleA;
            else {
                var V = r.MulRV(S, this.m_localAxisC, b2GearJoint.SolvePositionConstraints_s_u),
                    g = r.MulRV(S, this.m_lalcC, b2GearJoint.SolvePositionConstraints_s_rC),
                    P = r.MulRV(b, this.m_lalcA, b2GearJoint.SolvePositionConstraints_s_rA);
                C.Copy(V), l = i.CrossVV(g, V), n = i.CrossVV(P, V), B += this.m_mC + this.m_mA + this.m_iC * l * l + this.m_iA * n * n;
                var w = this.m_lalcC,
                    M = r.MulTRV(S, i.AddVV(P, i.SubVV(_, p, i.s_t0), i.s_t0), i.s_t0);
                o = i.DotVV(i.SubVV(M, w, i.s_t0), this.m_localAxisC)
            } if (1 === this.m_typeB) A.SetZero(), a = this.m_ratio, m = this.m_ratio, B += this.m_ratio * this.m_ratio * (this.m_iB + this.m_iD), s = c - y - this.m_referenceAngleB;
            else {
                V = r.MulRV(x, this.m_localAxisD, b2GearJoint.SolvePositionConstraints_s_u);
                var I = r.MulRV(x, this.m_lalcD, b2GearJoint.SolvePositionConstraints_s_rD),
                    D = r.MulRV(v, this.m_lalcB, b2GearJoint.SolvePositionConstraints_s_rB);
                i.MulSV(this.m_ratio, V, A), m = this.m_ratio * i.CrossVV(I, V), a = this.m_ratio * i.CrossVV(D, V), B += this.m_ratio * this.m_ratio * (this.m_mD + this.m_mB) + this.m_iD * m * m + this.m_iB * a * a;
                var G = this.m_lalcD,
                    F = r.MulTRV(x, i.AddVV(D, i.SubVV(u, d, i.s_t0), i.s_t0), i.s_t0);
                s = i.DotVV(i.SubVV(F, G, i.s_t0), this.m_localAxisD)
            }
            var R = o + this.m_ratio * s - this.m_constant,
                J = 0;
            return B > 0 && (J = -R / B), _.SelfMulAdd(this.m_mA * J, C), h += this.m_iA * J * n, u.SelfMulAdd(this.m_mB * J, A), c += this.m_iB * J * a, p.SelfMulSub(this.m_mC * J, C), f -= this.m_iC * J * l, d.SelfMulSub(this.m_mD * J, A), y -= this.m_iD * J * m, e.positions[this.m_indexA].a = h, e.positions[this.m_indexB].a = c, e.positions[this.m_indexC].a = f, e.positions[this.m_indexD].a = y, 0 < t.b2_linearSlop
        }, b2GearJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2GearJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2GearJoint.prototype.GetReactionForce = function (t, e) {
            return i.MulSV(t * this.m_impulse, this.m_JvAC, e)
        }, b2GearJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_impulse * this.m_JwA
        }, b2GearJoint.prototype.GetJoint1 = function () {
            return this.m_joint1
        }, b2GearJoint.prototype.GetJoint2 = function () {
            return this.m_joint2
        }, b2GearJoint.prototype.GetRatio = function () {
            return this.m_ratio
        }, b2GearJoint.prototype.SetRatio = function (t) {
            this.m_ratio = t
        }, b2GearJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex,
                o = this.m_joint1.m_index,
                s = this.m_joint2.m_index;
            t("  const jd: b2GearJointDef = new b2GearJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.joint1 = joints[%d];\n", o), t("  jd.joint2 = joints[%d];\n", s), t("  jd.ratio = %.15f;\n", this.m_ratio), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2GearJoint.InitVelocityConstraints_s_u = new i, b2GearJoint.InitVelocityConstraints_s_rA = new i, b2GearJoint.InitVelocityConstraints_s_rB = new i, b2GearJoint.InitVelocityConstraints_s_rC = new i, b2GearJoint.InitVelocityConstraints_s_rD = new i, b2GearJoint.SolvePositionConstraints_s_u = new i, b2GearJoint.SolvePositionConstraints_s_rA = new i, b2GearJoint.SolvePositionConstraints_s_rB = new i, b2GearJoint.SolvePositionConstraints_s_rC = new i, b2GearJoint.SolvePositionConstraints_s_rD = new i, b2GearJoint
    }(vt);
    t.b2GearJoint = qt;
    var zt = function (t) {
        function b2MotorJointDef() {
            var e = t.call(this, 11) || this;
            return e.linearOffset = new i(0, 0), e.angularOffset = 0, e.maxForce = 1, e.maxTorque = 1, e.correctionFactor = .3, e
        }
        return __extends(b2MotorJointDef, t), b2MotorJointDef.prototype.Initialize = function (t, e) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(this.bodyB.GetPosition(), this.linearOffset);
            var i = this.bodyA.GetAngle(),
                o = this.bodyB.GetAngle();
            this.angularOffset = o - i
        }, b2MotorJointDef
    }(bt);
    t.b2MotorJointDef = zt;
    var Wt = function (t) {
        function b2MotorJoint(e) {
            var o = t.call(this, e) || this;
            return o.m_linearOffset = new i, o.m_angularOffset = 0, o.m_linearImpulse = new i, o.m_angularImpulse = 0, o.m_maxForce = 0, o.m_maxTorque = 0, o.m_correctionFactor = .3, o.m_indexA = 0, o.m_indexB = 0, o.m_rA = new i, o.m_rB = new i, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_linearError = new i, o.m_angularError = 0, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_linearMass = new s, o.m_angularMass = 0, o.m_qA = new r, o.m_qB = new r, o.m_K = new s, o.m_linearOffset.Copy(e.linearOffset), o.m_linearImpulse.SetZero(), o.m_maxForce = e.maxForce, o.m_maxTorque = e.maxTorque, o.m_correctionFactor = e.correctionFactor, o
        }
        return __extends(b2MotorJoint, t), b2MotorJoint.prototype.GetAnchorA = function () {
            return this.m_bodyA.GetPosition()
        }, b2MotorJoint.prototype.GetAnchorB = function () {
            return this.m_bodyB.GetPosition()
        }, b2MotorJoint.prototype.GetReactionForce = function (t, e) {
            return i.MulSV(t, this.m_linearImpulse, e)
        }, b2MotorJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_angularImpulse
        }, b2MotorJoint.prototype.SetLinearOffset = function (t) {
            i.IsEqualToV(t, this.m_linearOffset) || (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_linearOffset.Copy(t))
        }, b2MotorJoint.prototype.GetLinearOffset = function () {
            return this.m_linearOffset
        }, b2MotorJoint.prototype.SetAngularOffset = function (t) {
            t !== this.m_angularOffset && (this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_angularOffset = t)
        }, b2MotorJoint.prototype.GetAngularOffset = function () {
            return this.m_angularOffset
        }, b2MotorJoint.prototype.SetMaxForce = function (t) {
            this.m_maxForce = t
        }, b2MotorJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce
        }, b2MotorJoint.prototype.SetMaxTorque = function (t) {
            this.m_maxTorque = t
        }, b2MotorJoint.prototype.GetMaxTorque = function () {
            return this.m_maxTorque
        }, b2MotorJoint.prototype.InitVelocityConstraints = function (t) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var e = t.positions[this.m_indexA].c,
                o = t.positions[this.m_indexA].a,
                s = t.velocities[this.m_indexA].v,
                n = t.velocities[this.m_indexA].w,
                a = t.positions[this.m_indexB].c,
                l = t.positions[this.m_indexB].a,
                m = t.velocities[this.m_indexB].v,
                _ = t.velocities[this.m_indexB].w,
                h = this.m_qA.SetAngle(o),
                u = this.m_qB.SetAngle(l),
                c = r.MulRV(h, i.NegV(this.m_localCenterA, i.s_t0), this.m_rA),
                p = r.MulRV(u, i.NegV(this.m_localCenterB, i.s_t0), this.m_rB),
                f = this.m_invMassA,
                d = this.m_invMassB,
                y = this.m_invIA,
                b = this.m_invIB,
                v = this.m_K;
            if (v.ex.x = f + d + y * c.y * c.y + b * p.y * p.y, v.ex.y = -y * c.x * c.y - b * p.x * p.y, v.ey.x = v.ex.y, v.ey.y = f + d + y * c.x * c.x + b * p.x * p.x, v.GetInverse(this.m_linearMass), this.m_angularMass = y + b, this.m_angularMass > 0 && (this.m_angularMass = 1 / this.m_angularMass), i.SubVV(i.SubVV(i.AddVV(a, p, i.s_t0), i.AddVV(e, c, i.s_t1), i.s_t2), r.MulRV(h, this.m_linearOffset, i.s_t3), this.m_linearError), this.m_angularError = l - o - this.m_angularOffset, t.step.warmStarting) {
                this.m_linearImpulse.SelfMul(t.step.dtRatio), this.m_angularImpulse *= t.step.dtRatio;
                var S = this.m_linearImpulse;
                s.SelfMulSub(f, S), n -= y * (i.CrossVV(c, S) + this.m_angularImpulse), m.SelfMulAdd(d, S), _ += b * (i.CrossVV(p, S) + this.m_angularImpulse)
            } else this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0;
            t.velocities[this.m_indexA].w = n, t.velocities[this.m_indexB].w = _
        }, b2MotorJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                n = t.velocities[this.m_indexB].v,
                r = t.velocities[this.m_indexB].w,
                a = this.m_invMassA,
                l = this.m_invMassB,
                m = this.m_invIA,
                _ = this.m_invIB,
                h = t.step.dt,
                u = t.step.inv_dt,
                c = r - o + u * this.m_correctionFactor * this.m_angularError,
                p = -this.m_angularMass * c,
                f = this.m_angularImpulse,
                d = h * this.m_maxTorque;
            this.m_angularImpulse = b2Clamp(this.m_angularImpulse + p, -d, d), o -= m * (p = this.m_angularImpulse - f), r += _ * p;
            var y = this.m_rA,
                b = this.m_rB,
                v = i.AddVV(i.SubVV(i.AddVV(n, i.CrossSV(r, b, i.s_t0), i.s_t0), i.AddVV(e, i.CrossSV(o, y, i.s_t1), i.s_t1), i.s_t2), i.MulSV(u * this.m_correctionFactor, this.m_linearError, i.s_t3), b2MotorJoint.SolveVelocityConstraints_s_Cdot_v2),
                S = s.MulMV(this.m_linearMass, v, b2MotorJoint.SolveVelocityConstraints_s_impulse_v2).SelfNeg(),
                x = b2MotorJoint.SolveVelocityConstraints_s_oldImpulse_v2.Copy(this.m_linearImpulse);
            this.m_linearImpulse.SelfAdd(S);
            d = h * this.m_maxForce;
            this.m_linearImpulse.LengthSquared() > d * d && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.SelfMul(d)), i.SubVV(this.m_linearImpulse, x, S), e.SelfMulSub(a, S), o -= m * i.CrossVV(y, S), n.SelfMulAdd(l, S), r += _ * i.CrossVV(b, S), t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = r
        }, b2MotorJoint.prototype.SolvePositionConstraints = function (t) {
            return !0
        }, b2MotorJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2MotorJointDef = new b2MotorJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.linearOffset.Set(%.15f, %.15f);\n", this.m_linearOffset.x, this.m_linearOffset.y), t("  jd.angularOffset = %.15f;\n", this.m_angularOffset), t("  jd.maxForce = %.15f;\n", this.m_maxForce), t("  jd.maxTorque = %.15f;\n", this.m_maxTorque), t("  jd.correctionFactor = %.15f;\n", this.m_correctionFactor), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2MotorJoint.SolveVelocityConstraints_s_Cdot_v2 = new i, b2MotorJoint.SolveVelocityConstraints_s_impulse_v2 = new i, b2MotorJoint.SolveVelocityConstraints_s_oldImpulse_v2 = new i, b2MotorJoint
    }(vt);
    t.b2MotorJoint = Wt;
    var Et = function (t) {
        function b2MouseJointDef() {
            var e = t.call(this, 5) || this;
            return e.target = new i, e.maxForce = 0, e.frequencyHz = 5, e.dampingRatio = .7, e
        }
        return __extends(b2MouseJointDef, t), b2MouseJointDef
    }(bt);
    t.b2MouseJointDef = Et;
    var jt = function (e) {
        function b2MouseJoint(t) {
            var o = e.call(this, t) || this;
            return o.m_localAnchorB = null, o.m_targetA = null, o.m_frequencyHz = 0, o.m_dampingRatio = 0, o.m_beta = 0, o.m_impulse = null, o.m_maxForce = 0, o.m_gamma = 0, o.m_indexA = 0, o.m_indexB = 0, o.m_rB = null, o.m_localCenterB = null, o.m_invMassB = 0, o.m_invIB = 0, o.m_mass = null, o.m_C = null, o.m_qB = null, o.m_lalcB = null, o.m_K = null, o.m_localAnchorB = new i, o.m_targetA = new i, o.m_impulse = new i, o.m_rB = new i, o.m_localCenterB = new i, o.m_mass = new s, o.m_C = new i, o.m_qB = new r, o.m_lalcB = new i, o.m_K = new s, o.m_targetA.Copy(t.target), a.MulTXV(o.m_bodyB.GetTransform(), o.m_targetA, o.m_localAnchorB), o.m_maxForce = t.maxForce, o.m_impulse.SetZero(), o.m_frequencyHz = t.frequencyHz, o.m_dampingRatio = t.dampingRatio, o.m_beta = 0, o.m_gamma = 0, o
        }
        return __extends(b2MouseJoint, e), b2MouseJoint.prototype.SetTarget = function (t) {
            this.m_bodyB.IsAwake() || this.m_bodyB.SetAwake(!0), this.m_targetA.Copy(t)
        }, b2MouseJoint.prototype.GetTarget = function () {
            return this.m_targetA
        }, b2MouseJoint.prototype.SetMaxForce = function (t) {
            this.m_maxForce = t
        }, b2MouseJoint.prototype.GetMaxForce = function () {
            return this.m_maxForce
        }, b2MouseJoint.prototype.SetFrequency = function (t) {
            this.m_frequencyHz = t
        }, b2MouseJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz
        }, b2MouseJoint.prototype.SetDampingRatio = function (t) {
            this.m_dampingRatio = t
        }, b2MouseJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio
        }, b2MouseJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexB].c,
                s = e.positions[this.m_indexB].a,
                n = e.velocities[this.m_indexB].v,
                a = e.velocities[this.m_indexB].w,
                l = this.m_qB.SetAngle(s),
                m = this.m_bodyB.GetMass(),
                _ = 2 * t.b2_pi * this.m_frequencyHz,
                h = 2 * m * this.m_dampingRatio * _,
                u = m * (_ * _),
                c = e.step.dt;
            this.m_gamma = c * (h + c * u), 0 !== this.m_gamma && (this.m_gamma = 1 / this.m_gamma), this.m_beta = c * u * this.m_gamma, i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(l, this.m_lalcB, this.m_rB);
            var p = this.m_K;
            p.ex.x = this.m_invMassB + this.m_invIB * this.m_rB.y * this.m_rB.y + this.m_gamma, p.ex.y = -this.m_invIB * this.m_rB.x * this.m_rB.y, p.ey.x = p.ex.y, p.ey.y = this.m_invMassB + this.m_invIB * this.m_rB.x * this.m_rB.x + this.m_gamma, p.GetInverse(this.m_mass), this.m_C.x = o.x + this.m_rB.x - this.m_targetA.x, this.m_C.y = o.y + this.m_rB.y - this.m_targetA.y, this.m_C.SelfMul(this.m_beta), a *= .98, e.step.warmStarting ? (this.m_impulse.SelfMul(e.step.dtRatio), n.x += this.m_invMassB * this.m_impulse.x, n.y += this.m_invMassB * this.m_impulse.y, a += this.m_invIB * i.CrossVV(this.m_rB, this.m_impulse)) : this.m_impulse.SetZero(), e.velocities[this.m_indexB].w = a
        }, b2MouseJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexB].v,
                o = t.velocities[this.m_indexB].w,
                n = i.AddVCrossSV(e, o, this.m_rB, b2MouseJoint.SolveVelocityConstraints_s_Cdot),
                r = s.MulMV(this.m_mass, i.AddVV(n, i.AddVV(this.m_C, i.MulSV(this.m_gamma, this.m_impulse, i.s_t0), i.s_t0), i.s_t0).SelfNeg(), b2MouseJoint.SolveVelocityConstraints_s_impulse),
                a = b2MouseJoint.SolveVelocityConstraints_s_oldImpulse.Copy(this.m_impulse);
            this.m_impulse.SelfAdd(r);
            var l = t.step.dt * this.m_maxForce;
            this.m_impulse.LengthSquared() > l * l && this.m_impulse.SelfMul(l / this.m_impulse.Length()), i.SubVV(this.m_impulse, a, r), e.SelfMulAdd(this.m_invMassB, r), o += this.m_invIB * i.CrossVV(this.m_rB, r), t.velocities[this.m_indexB].w = o
        }, b2MouseJoint.prototype.SolvePositionConstraints = function (t) {
            return !0
        }, b2MouseJoint.prototype.GetAnchorA = function (t) {
            return t.Copy(this.m_targetA)
        }, b2MouseJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2MouseJoint.prototype.GetReactionForce = function (t, e) {
            return i.MulSV(t, this.m_impulse, e)
        }, b2MouseJoint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2MouseJoint.prototype.Dump = function (t) {
            t("Mouse joint dumping is not supported.\n")
        }, b2MouseJoint.prototype.ShiftOrigin = function (t) {
            this.m_targetA.SelfSub(t)
        }, b2MouseJoint.SolveVelocityConstraints_s_Cdot = new i, b2MouseJoint.SolveVelocityConstraints_s_impulse = new i, b2MouseJoint.SolveVelocityConstraints_s_oldImpulse = new i, b2MouseJoint
    }(vt);
    t.b2MouseJoint = jt, t.b2_minPulleyLength = 2;
    var Nt = function (t) {
        function b2PulleyJointDef() {
            var e = t.call(this, 4) || this;
            return e.groundAnchorA = new i(-1, 1), e.groundAnchorB = new i(1, 1), e.localAnchorA = new i(-1, 0), e.localAnchorB = new i(1, 0), e.lengthA = 0, e.lengthB = 0, e.ratio = 1, e.collideConnected = !0, e
        }
        return __extends(b2PulleyJointDef, t), b2PulleyJointDef.prototype.Initialize = function (t, e, o, s, n, r, a) {
            this.bodyA = t, this.bodyB = e, this.groundAnchorA.Copy(o), this.groundAnchorB.Copy(s), this.bodyA.GetLocalPoint(n, this.localAnchorA), this.bodyB.GetLocalPoint(r, this.localAnchorB), this.lengthA = i.DistanceVV(n, o), this.lengthB = i.DistanceVV(r, s), this.ratio = a
        }, b2PulleyJointDef
    }(bt);
    t.b2PulleyJointDef = Nt;
    var Ot = function (e) {
        function b2PulleyJoint(t) {
            var o = e.call(this, t) || this;
            return o.m_groundAnchorA = new i, o.m_groundAnchorB = new i, o.m_lengthA = 0, o.m_lengthB = 0, o.m_localAnchorA = new i, o.m_localAnchorB = new i, o.m_constant = 0, o.m_ratio = 0, o.m_impulse = 0, o.m_indexA = 0, o.m_indexB = 0, o.m_uA = new i, o.m_uB = new i, o.m_rA = new i, o.m_rB = new i, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_mass = 0, o.m_qA = new r, o.m_qB = new r, o.m_lalcA = new i, o.m_lalcB = new i, o.m_groundAnchorA.Copy(t.groundAnchorA), o.m_groundAnchorB.Copy(t.groundAnchorB), o.m_localAnchorA.Copy(t.localAnchorA), o.m_localAnchorB.Copy(t.localAnchorB), o.m_lengthA = t.lengthA, o.m_lengthB = t.lengthB, o.m_ratio = t.ratio, o.m_constant = t.lengthA + o.m_ratio * t.lengthB, o.m_impulse = 0, o
        }
        return __extends(b2PulleyJoint, e), b2PulleyJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.velocities[this.m_indexA].v,
                a = e.velocities[this.m_indexA].w,
                l = e.positions[this.m_indexB].c,
                m = e.positions[this.m_indexB].a,
                _ = e.velocities[this.m_indexB].v,
                h = e.velocities[this.m_indexB].w,
                u = this.m_qA.SetAngle(s),
                c = this.m_qB.SetAngle(m);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), r.MulRV(u, this.m_lalcA, this.m_rA), i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(c, this.m_lalcB, this.m_rB), this.m_uA.Copy(o).SelfAdd(this.m_rA).SelfSub(this.m_groundAnchorA), this.m_uB.Copy(l).SelfAdd(this.m_rB).SelfSub(this.m_groundAnchorB);
            var p = this.m_uA.Length(),
                f = this.m_uB.Length();
            p > 10 * t.b2_linearSlop ? this.m_uA.SelfMul(1 / p) : this.m_uA.SetZero(), f > 10 * t.b2_linearSlop ? this.m_uB.SelfMul(1 / f) : this.m_uB.SetZero();
            var d = i.CrossVV(this.m_rA, this.m_uA),
                y = i.CrossVV(this.m_rB, this.m_uB),
                b = this.m_invMassA + this.m_invIA * d * d,
                v = this.m_invMassB + this.m_invIB * y * y;
            if (this.m_mass = b + this.m_ratio * this.m_ratio * v, this.m_mass > 0 && (this.m_mass = 1 / this.m_mass), e.step.warmStarting) {
                this.m_impulse *= e.step.dtRatio;
                var S = i.MulSV(-this.m_impulse, this.m_uA, b2PulleyJoint.InitVelocityConstraints_s_PA),
                    x = i.MulSV(-this.m_ratio * this.m_impulse, this.m_uB, b2PulleyJoint.InitVelocityConstraints_s_PB);
                n.SelfMulAdd(this.m_invMassA, S), a += this.m_invIA * i.CrossVV(this.m_rA, S), _.SelfMulAdd(this.m_invMassB, x), h += this.m_invIB * i.CrossVV(this.m_rB, x)
            } else this.m_impulse = 0;
            e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = h
        }, b2PulleyJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = i.AddVCrossSV(e, o, this.m_rA, b2PulleyJoint.SolveVelocityConstraints_s_vpA),
                a = i.AddVCrossSV(s, n, this.m_rB, b2PulleyJoint.SolveVelocityConstraints_s_vpB),
                l = -i.DotVV(this.m_uA, r) - this.m_ratio * i.DotVV(this.m_uB, a),
                m = -this.m_mass * l;
            this.m_impulse += m;
            var _ = i.MulSV(-m, this.m_uA, b2PulleyJoint.SolveVelocityConstraints_s_PA),
                h = i.MulSV(-this.m_ratio * m, this.m_uB, b2PulleyJoint.SolveVelocityConstraints_s_PB);
            e.SelfMulAdd(this.m_invMassA, _), o += this.m_invIA * i.CrossVV(this.m_rA, _), s.SelfMulAdd(this.m_invMassB, h), n += this.m_invIB * i.CrossVV(this.m_rB, h), t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n
        }, b2PulleyJoint.prototype.SolvePositionConstraints = function (e) {
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = this.m_qA.SetAngle(s),
                m = this.m_qB.SetAngle(a);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var _ = r.MulRV(l, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var h = r.MulRV(m, this.m_lalcB, this.m_rB),
                u = this.m_uA.Copy(o).SelfAdd(_).SelfSub(this.m_groundAnchorA),
                c = this.m_uB.Copy(n).SelfAdd(h).SelfSub(this.m_groundAnchorB),
                p = u.Length(),
                f = c.Length();
            p > 10 * t.b2_linearSlop ? u.SelfMul(1 / p) : u.SetZero(), f > 10 * t.b2_linearSlop ? c.SelfMul(1 / f) : c.SetZero();
            var d = i.CrossVV(_, u),
                y = i.CrossVV(h, c),
                b = this.m_invMassA + this.m_invIA * d * d,
                v = this.m_invMassB + this.m_invIB * y * y,
                S = b + this.m_ratio * this.m_ratio * v;
            S > 0 && (S = 1 / S);
            var x = this.m_constant - p - this.m_ratio * f,
                C = b2Abs(x),
                A = -S * x,
                B = i.MulSV(-A, u, b2PulleyJoint.SolvePositionConstraints_s_PA),
                V = i.MulSV(-this.m_ratio * A, c, b2PulleyJoint.SolvePositionConstraints_s_PB);
            return o.SelfMulAdd(this.m_invMassA, B), s += this.m_invIA * i.CrossVV(_, B), n.SelfMulAdd(this.m_invMassB, V), a += this.m_invIB * i.CrossVV(h, V), e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, C < t.b2_linearSlop
        }, b2PulleyJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2PulleyJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2PulleyJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * this.m_impulse * this.m_uB.x, t * this.m_impulse * this.m_uB.y)
        }, b2PulleyJoint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2PulleyJoint.prototype.GetGroundAnchorA = function () {
            return this.m_groundAnchorA
        }, b2PulleyJoint.prototype.GetGroundAnchorB = function () {
            return this.m_groundAnchorB
        }, b2PulleyJoint.prototype.GetLengthA = function () {
            return this.m_lengthA
        }, b2PulleyJoint.prototype.GetLengthB = function () {
            return this.m_lengthB
        }, b2PulleyJoint.prototype.GetRatio = function () {
            return this.m_ratio
        }, b2PulleyJoint.prototype.GetCurrentLengthA = function () {
            var t = this.m_bodyA.GetWorldPoint(this.m_localAnchorA, b2PulleyJoint.GetCurrentLengthA_s_p),
                e = this.m_groundAnchorA;
            return i.DistanceVV(t, e)
        }, b2PulleyJoint.prototype.GetCurrentLengthB = function () {
            var t = this.m_bodyB.GetWorldPoint(this.m_localAnchorB, b2PulleyJoint.GetCurrentLengthB_s_p),
                e = this.m_groundAnchorB;
            return i.DistanceVV(t, e)
        }, b2PulleyJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2PulleyJointDef = new b2PulleyJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.groundAnchorA.Set(%.15f, %.15f);\n", this.m_groundAnchorA.x, this.m_groundAnchorA.y), t("  jd.groundAnchorB.Set(%.15f, %.15f);\n", this.m_groundAnchorB.x, this.m_groundAnchorB.y), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.lengthA = %.15f;\n", this.m_lengthA), t("  jd.lengthB = %.15f;\n", this.m_lengthB), t("  jd.ratio = %.15f;\n", this.m_ratio), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2PulleyJoint.prototype.ShiftOrigin = function (t) {
            this.m_groundAnchorA.SelfSub(t), this.m_groundAnchorB.SelfSub(t)
        }, b2PulleyJoint.InitVelocityConstraints_s_PA = new i, b2PulleyJoint.InitVelocityConstraints_s_PB = new i, b2PulleyJoint.SolveVelocityConstraints_s_vpA = new i, b2PulleyJoint.SolveVelocityConstraints_s_vpB = new i, b2PulleyJoint.SolveVelocityConstraints_s_PA = new i, b2PulleyJoint.SolveVelocityConstraints_s_PB = new i, b2PulleyJoint.SolvePositionConstraints_s_PA = new i, b2PulleyJoint.SolvePositionConstraints_s_PB = new i, b2PulleyJoint.GetCurrentLengthA_s_p = new i, b2PulleyJoint.GetCurrentLengthB_s_p = new i, b2PulleyJoint
    }(vt);
    t.b2PulleyJoint = Ot;
    var Xt = function (t) {
        function b2RopeJointDef() {
            var e = t.call(this, 10) || this;
            return e.localAnchorA = new i(-1, 0), e.localAnchorB = new i(1, 0), e.maxLength = 0, e
        }
        return __extends(b2RopeJointDef, t), b2RopeJointDef
    }(bt);
    t.b2RopeJointDef = Xt;
    var Ut = function (e) {
        function b2RopeJoint(t) {
            var o = e.call(this, t) || this;
            return o.m_localAnchorA = new i, o.m_localAnchorB = new i, o.m_maxLength = 0, o.m_length = 0, o.m_impulse = 0, o.m_indexA = 0, o.m_indexB = 0, o.m_u = new i, o.m_rA = new i, o.m_rB = new i, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_mass = 0, o.m_state = 0, o.m_qA = new r, o.m_qB = new r, o.m_lalcA = new i, o.m_lalcB = new i, o.m_localAnchorA.Copy(t.localAnchorA), o.m_localAnchorB.Copy(t.localAnchorB), o.m_maxLength = t.maxLength, o
        }
        return __extends(b2RopeJoint, e), b2RopeJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.velocities[this.m_indexA].v,
                a = e.velocities[this.m_indexA].w,
                l = e.positions[this.m_indexB].c,
                m = e.positions[this.m_indexB].a,
                _ = e.velocities[this.m_indexB].v,
                h = e.velocities[this.m_indexB].w,
                u = this.m_qA.SetAngle(s),
                c = this.m_qB.SetAngle(m);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), r.MulRV(u, this.m_lalcA, this.m_rA), i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(c, this.m_lalcB, this.m_rB), this.m_u.Copy(l).SelfAdd(this.m_rB).SelfSub(o).SelfSub(this.m_rA), this.m_length = this.m_u.Length();
            var p = this.m_length - this.m_maxLength;
            if (this.m_state = p > 0 ? 2 : 0, !(this.m_length > t.b2_linearSlop)) return this.m_u.SetZero(), this.m_mass = 0, void(this.m_impulse = 0);
            this.m_u.SelfMul(1 / this.m_length);
            var f = i.CrossVV(this.m_rA, this.m_u),
                d = i.CrossVV(this.m_rB, this.m_u),
                y = this.m_invMassA + this.m_invIA * f * f + this.m_invMassB + this.m_invIB * d * d;
            if (this.m_mass = 0 !== y ? 1 / y : 0, e.step.warmStarting) {
                this.m_impulse *= e.step.dtRatio;
                var b = i.MulSV(this.m_impulse, this.m_u, b2RopeJoint.InitVelocityConstraints_s_P);
                n.SelfMulSub(this.m_invMassA, b), a -= this.m_invIA * i.CrossVV(this.m_rA, b), _.SelfMulAdd(this.m_invMassB, b), h += this.m_invIB * i.CrossVV(this.m_rB, b)
            } else this.m_impulse = 0;
            e.velocities[this.m_indexA].w = a, e.velocities[this.m_indexB].w = h
        }, b2RopeJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                n = t.velocities[this.m_indexB].w,
                r = i.AddVCrossSV(e, o, this.m_rA, b2RopeJoint.SolveVelocityConstraints_s_vpA),
                a = i.AddVCrossSV(s, n, this.m_rB, b2RopeJoint.SolveVelocityConstraints_s_vpB),
                l = this.m_length - this.m_maxLength,
                m = i.DotVV(this.m_u, i.SubVV(a, r, i.s_t0));
            l < 0 && (m += t.step.inv_dt * l);
            var _ = -this.m_mass * m,
                h = this.m_impulse;
            this.m_impulse = b2Min(0, this.m_impulse + _), _ = this.m_impulse - h;
            var u = i.MulSV(_, this.m_u, b2RopeJoint.SolveVelocityConstraints_s_P);
            e.SelfMulSub(this.m_invMassA, u), o -= this.m_invIA * i.CrossVV(this.m_rA, u), s.SelfMulAdd(this.m_invMassB, u), n += this.m_invIB * i.CrossVV(this.m_rB, u), t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = n
        }, b2RopeJoint.prototype.SolvePositionConstraints = function (e) {
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = this.m_qA.SetAngle(s),
                m = this.m_qB.SetAngle(a);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var _ = r.MulRV(l, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var h = r.MulRV(m, this.m_lalcB, this.m_rB),
                u = this.m_u.Copy(n).SelfAdd(h).SelfSub(o).SelfSub(_),
                c = u.Normalize(),
                p = c - this.m_maxLength;
            p = b2Clamp(p, 0, t.b2_maxLinearCorrection);
            var f = -this.m_mass * p,
                d = i.MulSV(f, u, b2RopeJoint.SolvePositionConstraints_s_P);
            return o.SelfMulSub(this.m_invMassA, d), s -= this.m_invIA * i.CrossVV(_, d), n.SelfMulAdd(this.m_invMassB, d), a += this.m_invIB * i.CrossVV(h, d), e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, c - this.m_maxLength < t.b2_linearSlop
        }, b2RopeJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2RopeJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2RopeJoint.prototype.GetReactionForce = function (t, e) {
            return i.MulSV(t * this.m_impulse, this.m_u, e)
        }, b2RopeJoint.prototype.GetReactionTorque = function (t) {
            return 0
        }, b2RopeJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2RopeJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2RopeJoint.prototype.SetMaxLength = function (t) {
            this.m_maxLength = t
        }, b2RopeJoint.prototype.GetMaxLength = function () {
            return this.m_maxLength
        }, b2RopeJoint.prototype.GetLimitState = function () {
            return this.m_state
        }, b2RopeJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2RopeJointDef = new b2RopeJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.maxLength = %.15f;\n", this.m_maxLength), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2RopeJoint.InitVelocityConstraints_s_P = new i, b2RopeJoint.SolveVelocityConstraints_s_vpA = new i, b2RopeJoint.SolveVelocityConstraints_s_vpB = new i, b2RopeJoint.SolveVelocityConstraints_s_P = new i, b2RopeJoint.SolvePositionConstraints_s_P = new i, b2RopeJoint
    }(vt);
    t.b2RopeJoint = Ut;
    var Zt = function (t) {
        function b2WeldJointDef() {
            var e = t.call(this, 8) || this;
            return e.localAnchorA = new i, e.localAnchorB = new i, e.referenceAngle = 0, e.frequencyHz = 0, e.dampingRatio = 0, e
        }
        return __extends(b2WeldJointDef, t), b2WeldJointDef.prototype.Initialize = function (t, e, i) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(i, this.localAnchorA), this.bodyB.GetLocalPoint(i, this.localAnchorB), this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
        }, b2WeldJointDef
    }(bt);
    t.b2WeldJointDef = Zt;
    var Ht = function (e) {
        function b2WeldJoint(t) {
            var s = e.call(this, t) || this;
            return s.m_frequencyHz = 0, s.m_dampingRatio = 0, s.m_bias = 0, s.m_localAnchorA = new i, s.m_localAnchorB = new i, s.m_referenceAngle = 0, s.m_gamma = 0, s.m_impulse = new o(0, 0, 0), s.m_indexA = 0, s.m_indexB = 0, s.m_rA = new i, s.m_rB = new i, s.m_localCenterA = new i, s.m_localCenterB = new i, s.m_invMassA = 0, s.m_invMassB = 0, s.m_invIA = 0, s.m_invIB = 0, s.m_mass = new n, s.m_qA = new r, s.m_qB = new r, s.m_lalcA = new i, s.m_lalcB = new i, s.m_K = new n, s.m_frequencyHz = t.frequencyHz, s.m_dampingRatio = t.dampingRatio, s.m_localAnchorA.Copy(t.localAnchorA), s.m_localAnchorB.Copy(t.localAnchorB), s.m_referenceAngle = t.referenceAngle, s.m_impulse.SetZero(), s
        }
        return __extends(b2WeldJoint, e), b2WeldJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = e.positions[this.m_indexA].a,
                s = e.velocities[this.m_indexA].v,
                n = e.velocities[this.m_indexA].w,
                a = e.positions[this.m_indexB].a,
                l = e.velocities[this.m_indexB].v,
                m = e.velocities[this.m_indexB].w,
                _ = this.m_qA.SetAngle(o),
                h = this.m_qB.SetAngle(a);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA), r.MulRV(_, this.m_lalcA, this.m_rA), i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB), r.MulRV(h, this.m_lalcB, this.m_rB);
            var u = this.m_invMassA,
                c = this.m_invMassB,
                p = this.m_invIA,
                f = this.m_invIB,
                d = this.m_K;
            if (d.ex.x = u + c + this.m_rA.y * this.m_rA.y * p + this.m_rB.y * this.m_rB.y * f, d.ey.x = -this.m_rA.y * this.m_rA.x * p - this.m_rB.y * this.m_rB.x * f, d.ez.x = -this.m_rA.y * p - this.m_rB.y * f, d.ex.y = d.ey.x, d.ey.y = u + c + this.m_rA.x * this.m_rA.x * p + this.m_rB.x * this.m_rB.x * f, d.ez.y = this.m_rA.x * p + this.m_rB.x * f, d.ex.z = d.ez.x, d.ey.z = d.ez.y, d.ez.z = p + f, this.m_frequencyHz > 0) {
                d.GetInverse22(this.m_mass);
                var y = p + f,
                    b = y > 0 ? 1 / y : 0,
                    v = a - o - this.m_referenceAngle,
                    S = 2 * t.b2_pi * this.m_frequencyHz,
                    x = 2 * b * this.m_dampingRatio * S,
                    C = b * S * S,
                    A = e.step.dt;
                this.m_gamma = A * (x + A * C), this.m_gamma = 0 !== this.m_gamma ? 1 / this.m_gamma : 0, this.m_bias = v * A * C * this.m_gamma, y += this.m_gamma, this.m_mass.ez.z = 0 !== y ? 1 / y : 0
            } else d.GetSymInverse33(this.m_mass), this.m_gamma = 0, this.m_bias = 0; if (e.step.warmStarting) {
                this.m_impulse.SelfMul(e.step.dtRatio);
                var B = b2WeldJoint.InitVelocityConstraints_s_P.Set(this.m_impulse.x, this.m_impulse.y);
                s.SelfMulSub(u, B), n -= p * (i.CrossVV(this.m_rA, B) + this.m_impulse.z), l.SelfMulAdd(c, B), m += f * (i.CrossVV(this.m_rB, B) + this.m_impulse.z)
            } else this.m_impulse.SetZero();
            e.velocities[this.m_indexA].w = n, e.velocities[this.m_indexB].w = m
        }, b2WeldJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = t.velocities[this.m_indexA].v,
                o = t.velocities[this.m_indexA].w,
                s = t.velocities[this.m_indexB].v,
                r = t.velocities[this.m_indexB].w,
                a = this.m_invMassA,
                l = this.m_invMassB,
                m = this.m_invIA,
                _ = this.m_invIB;
            if (this.m_frequencyHz > 0) {
                var h = r - o,
                    u = -this.m_mass.ez.z * (h + this.m_bias + this.m_gamma * this.m_impulse.z);
                this.m_impulse.z += u, o -= m * u, r += _ * u;
                var c = i.SubVV(i.AddVCrossSV(s, r, this.m_rB, i.s_t0), i.AddVCrossSV(e, o, this.m_rA, i.s_t1), b2WeldJoint.SolveVelocityConstraints_s_Cdot1),
                    p = n.MulM33XY(this.m_mass, c.x, c.y, b2WeldJoint.SolveVelocityConstraints_s_impulse1).SelfNeg();
                this.m_impulse.x += p.x, this.m_impulse.y += p.y;
                var f = p;
                e.SelfMulSub(a, f), o -= m * i.CrossVV(this.m_rA, f), s.SelfMulAdd(l, f), r += _ * i.CrossVV(this.m_rB, f)
            } else {
                c = i.SubVV(i.AddVCrossSV(s, r, this.m_rB, i.s_t0), i.AddVCrossSV(e, o, this.m_rA, i.s_t1), b2WeldJoint.SolveVelocityConstraints_s_Cdot1), h = r - o;
                var d = n.MulM33XYZ(this.m_mass, c.x, c.y, h, b2WeldJoint.SolveVelocityConstraints_s_impulse).SelfNeg();
                this.m_impulse.SelfAdd(d);
                f = b2WeldJoint.SolveVelocityConstraints_s_P.Set(d.x, d.y);
                e.SelfMulSub(a, f), o -= m * (i.CrossVV(this.m_rA, f) + d.z), s.SelfMulAdd(l, f), r += _ * (i.CrossVV(this.m_rB, f) + d.z)
            }
            t.velocities[this.m_indexA].w = o, t.velocities[this.m_indexB].w = r
        }, b2WeldJoint.prototype.SolvePositionConstraints = function (e) {
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = this.m_qA.SetAngle(s),
                m = this.m_qB.SetAngle(a),
                _ = this.m_invMassA,
                h = this.m_invMassB,
                u = this.m_invIA,
                c = this.m_invIB;
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var p = r.MulRV(l, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var f, d, y = r.MulRV(m, this.m_lalcB, this.m_rB),
                b = this.m_K;
            if (b.ex.x = _ + h + p.y * p.y * u + y.y * y.y * c, b.ey.x = -p.y * p.x * u - y.y * y.x * c, b.ez.x = -p.y * u - y.y * c, b.ex.y = b.ey.x, b.ey.y = _ + h + p.x * p.x * u + y.x * y.x * c, b.ez.y = p.x * u + y.x * c, b.ex.z = b.ez.x, b.ey.z = b.ez.y, b.ez.z = u + c, this.m_frequencyHz > 0) {
                f = (S = i.SubVV(i.AddVV(n, y, i.s_t0), i.AddVV(o, p, i.s_t1), b2WeldJoint.SolvePositionConstraints_s_C1)).Length(), d = 0;
                var v = b.Solve22(S.x, S.y, b2WeldJoint.SolvePositionConstraints_s_P).SelfNeg();
                o.SelfMulSub(_, v), s -= u * i.CrossVV(p, v), n.SelfMulAdd(h, v), a += c * i.CrossVV(y, v)
            } else {
                var S = i.SubVV(i.AddVV(n, y, i.s_t0), i.AddVV(o, p, i.s_t1), b2WeldJoint.SolvePositionConstraints_s_C1),
                    x = a - s - this.m_referenceAngle;
                f = S.Length(), d = b2Abs(x);
                var C = b.Solve33(S.x, S.y, x, b2WeldJoint.SolvePositionConstraints_s_impulse).SelfNeg();
                v = b2WeldJoint.SolvePositionConstraints_s_P.Set(C.x, C.y);
                o.SelfMulSub(_, v), s -= u * (i.CrossVV(this.m_rA, v) + C.z), n.SelfMulAdd(h, v), a += c * (i.CrossVV(this.m_rB, v) + C.z)
            }
            return e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, f <= t.b2_linearSlop && d <= t.b2_angularSlop
        }, b2WeldJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2WeldJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2WeldJoint.prototype.GetReactionForce = function (t, e) {
            return e.Set(t * this.m_impulse.x, t * this.m_impulse.y)
        }, b2WeldJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_impulse.z
        }, b2WeldJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2WeldJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2WeldJoint.prototype.GetReferenceAngle = function () {
            return this.m_referenceAngle
        }, b2WeldJoint.prototype.SetFrequency = function (t) {
            this.m_frequencyHz = t
        }, b2WeldJoint.prototype.GetFrequency = function () {
            return this.m_frequencyHz
        }, b2WeldJoint.prototype.SetDampingRatio = function (t) {
            this.m_dampingRatio = t
        }, b2WeldJoint.prototype.GetDampingRatio = function () {
            return this.m_dampingRatio
        }, b2WeldJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2WeldJointDef = new b2WeldJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.referenceAngle = %.15f;\n", this.m_referenceAngle), t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz), t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2WeldJoint.InitVelocityConstraints_s_P = new i, b2WeldJoint.SolveVelocityConstraints_s_Cdot1 = new i, b2WeldJoint.SolveVelocityConstraints_s_impulse1 = new i, b2WeldJoint.SolveVelocityConstraints_s_impulse = new o, b2WeldJoint.SolveVelocityConstraints_s_P = new i, b2WeldJoint.SolvePositionConstraints_s_C1 = new i, b2WeldJoint.SolvePositionConstraints_s_P = new i, b2WeldJoint.SolvePositionConstraints_s_impulse = new o, b2WeldJoint
    }(vt);
    t.b2WeldJoint = Ht;
    var Qt = function (t) {
        function b2WheelJointDef() {
            var e = t.call(this, 7) || this;
            return e.localAnchorA = new i(0, 0), e.localAnchorB = new i(0, 0), e.localAxisA = new i(1, 0), e.enableMotor = !1, e.maxMotorTorque = 0, e.motorSpeed = 0, e.frequencyHz = 2, e.dampingRatio = .7, e
        }
        return __extends(b2WheelJointDef, t), b2WheelJointDef.prototype.Initialize = function (t, e, i, o) {
            this.bodyA = t, this.bodyB = e, this.bodyA.GetLocalPoint(i, this.localAnchorA), this.bodyB.GetLocalPoint(i, this.localAnchorB), this.bodyA.GetLocalVector(o, this.localAxisA)
        }, b2WheelJointDef
    }(bt);
    t.b2WheelJointDef = Qt;
    var Yt = function (e) {
        function b2WheelJoint(t) {
            var o = e.call(this, t) || this;
            return o.m_frequencyHz = 0, o.m_dampingRatio = 0, o.m_localAnchorA = new i, o.m_localAnchorB = new i, o.m_localXAxisA = new i, o.m_localYAxisA = new i, o.m_impulse = 0, o.m_motorImpulse = 0, o.m_springImpulse = 0, o.m_maxMotorTorque = 0, o.m_motorSpeed = 0, o.m_enableMotor = !1, o.m_indexA = 0, o.m_indexB = 0, o.m_localCenterA = new i, o.m_localCenterB = new i, o.m_invMassA = 0, o.m_invMassB = 0, o.m_invIA = 0, o.m_invIB = 0, o.m_ax = new i, o.m_ay = new i, o.m_sAx = 0, o.m_sBx = 0, o.m_sAy = 0, o.m_sBy = 0, o.m_mass = 0, o.m_motorMass = 0, o.m_springMass = 0, o.m_bias = 0, o.m_gamma = 0, o.m_qA = new r, o.m_qB = new r, o.m_lalcA = new i, o.m_lalcB = new i, o.m_rA = new i, o.m_rB = new i, o.m_frequencyHz = t.frequencyHz, o.m_dampingRatio = t.dampingRatio, o.m_localAnchorA.Copy(t.localAnchorA), o.m_localAnchorB.Copy(t.localAnchorB), o.m_localXAxisA.Copy(t.localAxisA), i.CrossOneV(o.m_localXAxisA, o.m_localYAxisA), o.m_maxMotorTorque = t.maxMotorTorque, o.m_motorSpeed = t.motorSpeed, o.m_enableMotor = t.enableMotor, o.m_ax.SetZero(), o.m_ay.SetZero(), o
        }
        return __extends(b2WheelJoint, e), b2WheelJoint.prototype.GetMotorSpeed = function () {
            return this.m_motorSpeed
        }, b2WheelJoint.prototype.GetMaxMotorTorque = function () {
            return this.m_maxMotorTorque
        }, b2WheelJoint.prototype.SetSpringFrequencyHz = function (t) {
            this.m_frequencyHz = t
        }, b2WheelJoint.prototype.GetSpringFrequencyHz = function () {
            return this.m_frequencyHz
        }, b2WheelJoint.prototype.SetSpringDampingRatio = function (t) {
            this.m_dampingRatio = t
        }, b2WheelJoint.prototype.GetSpringDampingRatio = function () {
            return this.m_dampingRatio
        }, b2WheelJoint.prototype.InitVelocityConstraints = function (e) {
            this.m_indexA = this.m_bodyA.m_islandIndex, this.m_indexB = this.m_bodyB.m_islandIndex, this.m_localCenterA.Copy(this.m_bodyA.m_sweep.localCenter), this.m_localCenterB.Copy(this.m_bodyB.m_sweep.localCenter), this.m_invMassA = this.m_bodyA.m_invMass, this.m_invMassB = this.m_bodyB.m_invMass, this.m_invIA = this.m_bodyA.m_invI, this.m_invIB = this.m_bodyB.m_invI;
            var o = this.m_invMassA,
                s = this.m_invMassB,
                n = this.m_invIA,
                a = this.m_invIB,
                l = e.positions[this.m_indexA].c,
                m = e.positions[this.m_indexA].a,
                _ = e.velocities[this.m_indexA].v,
                h = e.velocities[this.m_indexA].w,
                u = e.positions[this.m_indexB].c,
                c = e.positions[this.m_indexB].a,
                p = e.velocities[this.m_indexB].v,
                f = e.velocities[this.m_indexB].w,
                d = this.m_qA.SetAngle(m),
                y = this.m_qB.SetAngle(c);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var b = r.MulRV(d, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var v = r.MulRV(y, this.m_lalcB, this.m_rB),
                S = i.SubVV(i.AddVV(u, v, i.s_t0), i.AddVV(l, b, i.s_t1), b2WheelJoint.InitVelocityConstraints_s_d);
            if (r.MulRV(d, this.m_localYAxisA, this.m_ay), this.m_sAy = i.CrossVV(i.AddVV(S, b, i.s_t0), this.m_ay), this.m_sBy = i.CrossVV(v, this.m_ay), this.m_mass = o + s + n * this.m_sAy * this.m_sAy + a * this.m_sBy * this.m_sBy, this.m_mass > 0 && (this.m_mass = 1 / this.m_mass), this.m_springMass = 0, this.m_bias = 0, this.m_gamma = 0, this.m_frequencyHz > 0) {
                r.MulRV(d, this.m_localXAxisA, this.m_ax), this.m_sAx = i.CrossVV(i.AddVV(S, b, i.s_t0), this.m_ax), this.m_sBx = i.CrossVV(v, this.m_ax);
                var x = o + s + n * this.m_sAx * this.m_sAx + a * this.m_sBx * this.m_sBx;
                if (x > 0) {
                    this.m_springMass = 1 / x;
                    var C = i.DotVV(S, this.m_ax),
                        A = 2 * t.b2_pi * this.m_frequencyHz,
                        B = 2 * this.m_springMass * this.m_dampingRatio * A,
                        V = this.m_springMass * A * A,
                        g = e.step.dt;
                    this.m_gamma = g * (B + g * V), this.m_gamma > 0 && (this.m_gamma = 1 / this.m_gamma), this.m_bias = C * g * V * this.m_gamma, this.m_springMass = x + this.m_gamma, this.m_springMass > 0 && (this.m_springMass = 1 / this.m_springMass)
                }
            } else this.m_springImpulse = 0; if (this.m_enableMotor ? (this.m_motorMass = n + a, this.m_motorMass > 0 && (this.m_motorMass = 1 / this.m_motorMass)) : (this.m_motorMass = 0, this.m_motorImpulse = 0), e.step.warmStarting) {
                this.m_impulse *= e.step.dtRatio, this.m_springImpulse *= e.step.dtRatio, this.m_motorImpulse *= e.step.dtRatio;
                var P = i.AddVV(i.MulSV(this.m_impulse, this.m_ay, i.s_t0), i.MulSV(this.m_springImpulse, this.m_ax, i.s_t1), b2WheelJoint.InitVelocityConstraints_s_P),
                    w = this.m_impulse * this.m_sAy + this.m_springImpulse * this.m_sAx + this.m_motorImpulse,
                    M = this.m_impulse * this.m_sBy + this.m_springImpulse * this.m_sBx + this.m_motorImpulse;
                _.SelfMulSub(this.m_invMassA, P), h -= this.m_invIA * w, p.SelfMulAdd(this.m_invMassB, P), f += this.m_invIB * M
            } else this.m_impulse = 0, this.m_springImpulse = 0, this.m_motorImpulse = 0;
            e.velocities[this.m_indexA].w = h, e.velocities[this.m_indexB].w = f
        }, b2WheelJoint.prototype.SolveVelocityConstraints = function (t) {
            var e = this.m_invMassA,
                o = this.m_invMassB,
                s = this.m_invIA,
                n = this.m_invIB,
                r = t.velocities[this.m_indexA].v,
                a = t.velocities[this.m_indexA].w,
                l = t.velocities[this.m_indexB].v,
                m = t.velocities[this.m_indexB].w,
                _ = i.DotVV(this.m_ax, i.SubVV(l, r, i.s_t0)) + this.m_sBx * m - this.m_sAx * a,
                h = -this.m_springMass * (_ + this.m_bias + this.m_gamma * this.m_springImpulse);
            this.m_springImpulse += h;
            var u = i.MulSV(h, this.m_ax, b2WheelJoint.SolveVelocityConstraints_s_P),
                c = h * this.m_sAx,
                p = h * this.m_sBx;
            r.SelfMulSub(e, u), a -= s * c, l.SelfMulAdd(o, u);
            _ = (m += n * p) - a - this.m_motorSpeed, h = -this.m_motorMass * _;
            var f = this.m_motorImpulse,
                d = t.step.dt * this.m_maxMotorTorque;
            this.m_motorImpulse = b2Clamp(this.m_motorImpulse + h, -d, d), a -= s * (h = this.m_motorImpulse - f), m += n * h;
            _ = i.DotVV(this.m_ay, i.SubVV(l, r, i.s_t0)) + this.m_sBy * m - this.m_sAy * a, h = -this.m_mass * _;
            this.m_impulse += h;
            u = i.MulSV(h, this.m_ay, b2WheelJoint.SolveVelocityConstraints_s_P), c = h * this.m_sAy, p = h * this.m_sBy;
            r.SelfMulSub(e, u), a -= s * c, l.SelfMulAdd(o, u), m += n * p, t.velocities[this.m_indexA].w = a, t.velocities[this.m_indexB].w = m
        }, b2WheelJoint.prototype.SolvePositionConstraints = function (e) {
            var o = e.positions[this.m_indexA].c,
                s = e.positions[this.m_indexA].a,
                n = e.positions[this.m_indexB].c,
                a = e.positions[this.m_indexB].a,
                l = this.m_qA.SetAngle(s),
                m = this.m_qB.SetAngle(a);
            i.SubVV(this.m_localAnchorA, this.m_localCenterA, this.m_lalcA);
            var _ = r.MulRV(l, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, this.m_localCenterB, this.m_lalcB);
            var h, u = r.MulRV(m, this.m_lalcB, this.m_rB),
                c = i.AddVV(i.SubVV(n, o, i.s_t0), i.SubVV(u, _, i.s_t1), b2WheelJoint.SolvePositionConstraints_s_d),
                p = r.MulRV(l, this.m_localYAxisA, this.m_ay),
                f = i.CrossVV(i.AddVV(c, _, i.s_t0), p),
                d = i.CrossVV(u, p),
                y = i.DotVV(c, this.m_ay),
                b = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_sAy * this.m_sAy + this.m_invIB * this.m_sBy * this.m_sBy;
            h = 0 !== b ? -y / b : 0;
            var v = i.MulSV(h, p, b2WheelJoint.SolvePositionConstraints_s_P),
                S = h * f,
                x = h * d;
            return o.SelfMulSub(this.m_invMassA, v), s -= this.m_invIA * S, n.SelfMulAdd(this.m_invMassB, v), a += this.m_invIB * x, e.positions[this.m_indexA].a = s, e.positions[this.m_indexB].a = a, b2Abs(y) <= t.b2_linearSlop
        }, b2WheelJoint.prototype.GetDefinition = function (t) {
            return t
        }, b2WheelJoint.prototype.GetAnchorA = function (t) {
            return this.m_bodyA.GetWorldPoint(this.m_localAnchorA, t)
        }, b2WheelJoint.prototype.GetAnchorB = function (t) {
            return this.m_bodyB.GetWorldPoint(this.m_localAnchorB, t)
        }, b2WheelJoint.prototype.GetReactionForce = function (t, e) {
            return e.x = t * (this.m_impulse * this.m_ay.x + this.m_springImpulse * this.m_ax.x), e.y = t * (this.m_impulse * this.m_ay.y + this.m_springImpulse * this.m_ax.y), e
        }, b2WheelJoint.prototype.GetReactionTorque = function (t) {
            return t * this.m_motorImpulse
        }, b2WheelJoint.prototype.GetLocalAnchorA = function () {
            return this.m_localAnchorA
        }, b2WheelJoint.prototype.GetLocalAnchorB = function () {
            return this.m_localAnchorB
        }, b2WheelJoint.prototype.GetLocalAxisA = function () {
            return this.m_localXAxisA
        }, b2WheelJoint.prototype.GetJointTranslation = function () {
            return this.GetPrismaticJointTranslation()
        }, b2WheelJoint.prototype.GetJointSpeed = function () {
            return this.GetRevoluteJointSpeed()
        }, b2WheelJoint.prototype.GetPrismaticJointTranslation = function () {
            var t = this.m_bodyA,
                e = this.m_bodyB,
                o = t.GetWorldPoint(this.m_localAnchorA, new i),
                s = e.GetWorldPoint(this.m_localAnchorB, new i),
                n = i.SubVV(s, o, new i),
                r = t.GetWorldVector(this.m_localXAxisA, new i);
            return i.DotVV(n, r)
        }, b2WheelJoint.prototype.GetPrismaticJointSpeed = function () {
            var t = this.m_bodyA,
                e = this.m_bodyB;
            i.SubVV(this.m_localAnchorA, t.m_sweep.localCenter, this.m_lalcA);
            var o = r.MulRV(t.m_xf.q, this.m_lalcA, this.m_rA);
            i.SubVV(this.m_localAnchorB, e.m_sweep.localCenter, this.m_lalcB);
            var s = r.MulRV(e.m_xf.q, this.m_lalcB, this.m_rB),
                n = i.AddVV(t.m_sweep.c, o, i.s_t0),
                a = i.AddVV(e.m_sweep.c, s, i.s_t1),
                l = i.SubVV(a, n, i.s_t2),
                m = t.GetWorldVector(this.m_localXAxisA, new i),
                _ = t.m_linearVelocity,
                h = e.m_linearVelocity,
                u = t.m_angularVelocity,
                c = e.m_angularVelocity;
            return i.DotVV(l, i.CrossSV(u, m, i.s_t0)) + i.DotVV(m, i.SubVV(i.AddVCrossSV(h, c, s, i.s_t0), i.AddVCrossSV(_, u, o, i.s_t1), i.s_t0))
        }, b2WheelJoint.prototype.GetRevoluteJointAngle = function () {
            return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a
        }, b2WheelJoint.prototype.GetRevoluteJointSpeed = function () {
            var t = this.m_bodyA.m_angularVelocity;
            return this.m_bodyB.m_angularVelocity - t
        }, b2WheelJoint.prototype.IsMotorEnabled = function () {
            return this.m_enableMotor
        }, b2WheelJoint.prototype.EnableMotor = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_enableMotor = t
        }, b2WheelJoint.prototype.SetMotorSpeed = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_motorSpeed = t
        }, b2WheelJoint.prototype.SetMaxMotorTorque = function (t) {
            this.m_bodyA.SetAwake(!0), this.m_bodyB.SetAwake(!0), this.m_maxMotorTorque = t
        }, b2WheelJoint.prototype.GetMotorTorque = function (t) {
            return t * this.m_motorImpulse
        }, b2WheelJoint.prototype.Dump = function (t) {
            var e = this.m_bodyA.m_islandIndex,
                i = this.m_bodyB.m_islandIndex;
            t("  const jd: b2WheelJointDef = new b2WheelJointDef();\n"), t("  jd.bodyA = bodies[%d];\n", e), t("  jd.bodyB = bodies[%d];\n", i), t("  jd.collideConnected = %s;\n", this.m_collideConnected ? "true" : "false"), t("  jd.localAnchorA.Set(%.15f, %.15f);\n", this.m_localAnchorA.x, this.m_localAnchorA.y), t("  jd.localAnchorB.Set(%.15f, %.15f);\n", this.m_localAnchorB.x, this.m_localAnchorB.y), t("  jd.localAxisA.Set(%.15f, %.15f);\n", this.m_localXAxisA.x, this.m_localXAxisA.y), t("  jd.enableMotor = %s;\n", this.m_enableMotor ? "true" : "false"), t("  jd.motorSpeed = %.15f;\n", this.m_motorSpeed), t("  jd.maxMotorTorque = %.15f;\n", this.m_maxMotorTorque), t("  jd.frequencyHz = %.15f;\n", this.m_frequencyHz), t("  jd.dampingRatio = %.15f;\n", this.m_dampingRatio), t("  joints[%d] = this.m_world.CreateJoint(jd);\n", this.m_index)
        }, b2WheelJoint.InitVelocityConstraints_s_d = new i, b2WheelJoint.InitVelocityConstraints_s_P = new i, b2WheelJoint.SolveVelocityConstraints_s_P = new i, b2WheelJoint.SolvePositionConstraints_s_d = new i, b2WheelJoint.SolvePositionConstraints_s_P = new i, b2WheelJoint
    }(vt);
    t.b2WheelJoint = Yt;
    var Kt = function () {
        function b2JointFactory() {}
        return b2JointFactory.Create = function (t, e) {
            var i = null;
            switch (t.type) {
            case 3:
                i = new Mt(t);
                break;
            case 5:
                i = new jt(t);
                break;
            case 2:
                i = new Jt(t);
                break;
            case 1:
                i = new Lt(t);
                break;
            case 4:
                i = new Ot(t);
                break;
            case 6:
                i = new qt(t);
                break;
            case 7:
                i = new Yt(t);
                break;
            case 8:
                i = new Ht(t);
                break;
            case 9:
                i = new Ft(t);
                break;
            case 10:
                i = new Ut(t);
                break;
            case 11:
                i = new Wt(t);
                break;
            case 12:
                i = new Dt(t)
            }
            return i
        }, b2JointFactory.Destroy = function (t, e) {}, b2JointFactory
    }();
    t.b2JointFactory = Kt;
    var $t = function () {
        function b2VelocityConstraintPoint() {
            this.rA = new i, this.rB = new i, this.normalImpulse = 0, this.tangentImpulse = 0, this.normalMass = 0, this.tangentMass = 0, this.velocityBias = 0
        }
        return b2VelocityConstraintPoint.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2VelocityConstraintPoint
            })
        }, b2VelocityConstraintPoint
    }();
    t.b2VelocityConstraintPoint = $t;
    var te = function () {
        function b2ContactVelocityConstraint() {
            this.points = $t.MakeArray(t.b2_maxManifoldPoints), this.normal = new i, this.tangent = new i, this.normalMass = new s, this.K = new s, this.indexA = 0, this.indexB = 0, this.invMassA = 0, this.invMassB = 0, this.invIA = 0, this.invIB = 0, this.friction = 0, this.restitution = 0, this.tangentSpeed = 0, this.pointCount = 0, this.contactIndex = 0
        }
        return b2ContactVelocityConstraint.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2ContactVelocityConstraint
            })
        }, b2ContactVelocityConstraint
    }();
    t.b2ContactVelocityConstraint = te;
    var ee = function () {
        function b2ContactPositionConstraint() {
            this.localPoints = i.MakeArray(t.b2_maxManifoldPoints), this.localNormal = new i, this.localPoint = new i, this.indexA = 0, this.indexB = 0, this.invMassA = 0, this.invMassB = 0, this.localCenterA = new i, this.localCenterB = new i, this.invIA = 0, this.invIB = 0, this.type = -1, this.radiusA = 0, this.radiusB = 0, this.pointCount = 0
        }
        return b2ContactPositionConstraint.MakeArray = function (t) {
            return b2MakeArray(t, function (t) {
                return new b2ContactPositionConstraint
            })
        }, b2ContactPositionConstraint
    }();
    t.b2ContactPositionConstraint = ee;
    var ie = function () {
        return function () {
            this.step = new ut, this.contacts = null, this.count = 0, this.positions = null, this.velocities = null, this.allocator = null
        }
    }();
    t.b2ContactSolverDef = ie;
    var oe = function () {
        function b2PositionSolverManifold() {
            this.normal = new i, this.point = new i, this.separation = 0
        }
        return b2PositionSolverManifold.prototype.Initialize = function (t, e, o, s) {
            var n = b2PositionSolverManifold.Initialize_s_pointA,
                l = b2PositionSolverManifold.Initialize_s_pointB,
                m = b2PositionSolverManifold.Initialize_s_planePoint,
                _ = b2PositionSolverManifold.Initialize_s_clipPoint;
            switch (t.type) {
            case 0:
                a.MulXV(e, t.localPoint, n), a.MulXV(o, t.localPoints[0], l), i.SubVV(l, n, this.normal).SelfNormalize(), i.MidVV(n, l, this.point), this.separation = i.DotVV(i.SubVV(l, n, i.s_t0), this.normal) - t.radiusA - t.radiusB;
                break;
            case 1:
                r.MulRV(e.q, t.localNormal, this.normal), a.MulXV(e, t.localPoint, m), a.MulXV(o, t.localPoints[s], _), this.separation = i.DotVV(i.SubVV(_, m, i.s_t0), this.normal) - t.radiusA - t.radiusB, this.point.Copy(_);
                break;
            case 2:
                r.MulRV(o.q, t.localNormal, this.normal), a.MulXV(o, t.localPoint, m), a.MulXV(e, t.localPoints[s], _), this.separation = i.DotVV(i.SubVV(_, m, i.s_t0), this.normal) - t.radiusA - t.radiusB, this.point.Copy(_), this.normal.SelfNeg()
            }
        }, b2PositionSolverManifold.Initialize_s_pointA = new i, b2PositionSolverManifold.Initialize_s_pointB = new i, b2PositionSolverManifold.Initialize_s_planePoint = new i, b2PositionSolverManifold.Initialize_s_clipPoint = new i, b2PositionSolverManifold
    }();
    t.b2PositionSolverManifold = oe;
    var se = function () {
        function b2ContactSolver() {
            this.m_step = new ut, this.m_positions = null, this.m_velocities = null, this.m_allocator = null, this.m_positionConstraints = ee.MakeArray(1024), this.m_velocityConstraints = te.MakeArray(1024), this.m_contacts = null, this.m_count = 0
        }
        return b2ContactSolver.prototype.Initialize = function (t) {
            if (this.m_step.Copy(t.step), this.m_allocator = t.allocator, this.m_count = t.count, this.m_positionConstraints.length < this.m_count)
                for (var e = b2Max(2 * this.m_positionConstraints.length, this.m_count); this.m_positionConstraints.length < e;) this.m_positionConstraints[this.m_positionConstraints.length] = new ee;
            if (this.m_velocityConstraints.length < this.m_count)
                for (e = b2Max(2 * this.m_velocityConstraints.length, this.m_count); this.m_velocityConstraints.length < e;) this.m_velocityConstraints[this.m_velocityConstraints.length] = new te;
            this.m_positions = t.positions, this.m_velocities = t.velocities, this.m_contacts = t.contacts;
            for (var i = 0; i < this.m_count; ++i) {
                var o = this.m_contacts[i],
                    s = o.m_fixtureA,
                    n = o.m_fixtureB,
                    r = s.GetShape(),
                    a = n.GetShape(),
                    l = r.m_radius,
                    m = a.m_radius,
                    _ = s.GetBody(),
                    h = n.GetBody(),
                    u = o.GetManifold(),
                    c = u.pointCount,
                    p = this.m_velocityConstraints[i];
                p.friction = o.m_friction, p.restitution = o.m_restitution, p.tangentSpeed = o.m_tangentSpeed, p.indexA = _.m_islandIndex, p.indexB = h.m_islandIndex, p.invMassA = _.m_invMass, p.invMassB = h.m_invMass, p.invIA = _.m_invI, p.invIB = h.m_invI, p.contactIndex = i, p.pointCount = c, p.K.SetZero(), p.normalMass.SetZero();
                var f = this.m_positionConstraints[i];
                f.indexA = _.m_islandIndex, f.indexB = h.m_islandIndex, f.invMassA = _.m_invMass, f.invMassB = h.m_invMass, f.localCenterA.Copy(_.m_sweep.localCenter), f.localCenterB.Copy(h.m_sweep.localCenter), f.invIA = _.m_invI, f.invIB = h.m_invI, f.localNormal.Copy(u.localNormal), f.localPoint.Copy(u.localPoint), f.pointCount = c, f.radiusA = l, f.radiusB = m, f.type = u.type;
                for (var d = 0; d < c; ++d) {
                    var y = u.points[d],
                        b = p.points[d];
                    this.m_step.warmStarting ? (b.normalImpulse = this.m_step.dtRatio * y.normalImpulse, b.tangentImpulse = this.m_step.dtRatio * y.tangentImpulse) : (b.normalImpulse = 0, b.tangentImpulse = 0), b.rA.SetZero(), b.rB.SetZero(), b.normalMass = 0, b.tangentMass = 0, b.velocityBias = 0, f.localPoints[d].Copy(y.localPoint)
                }
            }
            return this
        }, b2ContactSolver.prototype.InitializeVelocityConstraints = function () {
            for (var e = b2ContactSolver.InitializeVelocityConstraints_s_xfA, o = b2ContactSolver.InitializeVelocityConstraints_s_xfB, s = b2ContactSolver.InitializeVelocityConstraints_s_worldManifold, n = 0; n < this.m_count; ++n) {
                var a = this.m_velocityConstraints[n],
                    l = this.m_positionConstraints[n],
                    m = l.radiusA,
                    _ = l.radiusB,
                    h = this.m_contacts[a.contactIndex].GetManifold(),
                    u = a.indexA,
                    c = a.indexB,
                    p = a.invMassA,
                    f = a.invMassB,
                    d = a.invIA,
                    y = a.invIB,
                    b = l.localCenterA,
                    v = l.localCenterB,
                    S = this.m_positions[u].c,
                    x = this.m_positions[u].a,
                    C = this.m_velocities[u].v,
                    A = this.m_velocities[u].w,
                    B = this.m_positions[c].c,
                    V = this.m_positions[c].a,
                    g = this.m_velocities[c].v,
                    P = this.m_velocities[c].w;
                e.q.SetAngle(x), o.q.SetAngle(V), i.SubVV(S, r.MulRV(e.q, b, i.s_t0), e.p), i.SubVV(B, r.MulRV(o.q, v, i.s_t0), o.p), s.Initialize(h, e, m, o, _), a.normal.Copy(s.normal), i.CrossVOne(a.normal, a.tangent);
                for (var w = a.pointCount, M = 0; M < w; ++M) {
                    var I = a.points[M];
                    i.SubVV(s.points[M], S, I.rA), i.SubVV(s.points[M], B, I.rB);
                    var D = i.CrossVV(I.rA, a.normal),
                        G = i.CrossVV(I.rB, a.normal),
                        F = p + f + d * D * D + y * G * G;
                    I.normalMass = F > 0 ? 1 / F : 0;
                    var R = a.tangent,
                        J = i.CrossVV(I.rA, R),
                        T = i.CrossVV(I.rB, R),
                        L = p + f + d * J * J + y * T * T;
                    I.tangentMass = L > 0 ? 1 / L : 0, I.velocityBias = 0;
                    var k = i.DotVV(a.normal, i.SubVV(i.AddVCrossSV(g, P, I.rB, i.s_t0), i.AddVCrossSV(C, A, I.rA, i.s_t1), i.s_t0));
                    k < -t.b2_velocityThreshold && (I.velocityBias += -a.restitution * k)
                }
                if (2 === a.pointCount) {
                    var q = a.points[0],
                        z = a.points[1],
                        W = i.CrossVV(q.rA, a.normal),
                        E = i.CrossVV(q.rB, a.normal),
                        j = i.CrossVV(z.rA, a.normal),
                        N = i.CrossVV(z.rB, a.normal),
                        O = p + f + d * W * W + y * E * E,
                        X = p + f + d * j * j + y * N * N,
                        U = p + f + d * W * j + y * E * N;
                    O * O < 1e3 * (O * X - U * U) ? (a.K.ex.Set(O, U), a.K.ey.Set(U, X), a.K.GetInverse(a.normalMass)) : a.pointCount = 1
                }
            }
        }, b2ContactSolver.prototype.WarmStart = function () {
            for (var t = b2ContactSolver.WarmStart_s_P, e = 0; e < this.m_count; ++e) {
                for (var o = this.m_velocityConstraints[e], s = o.indexA, n = o.indexB, r = o.invMassA, a = o.invIA, l = o.invMassB, m = o.invIB, _ = o.pointCount, h = this.m_velocities[s].v, u = this.m_velocities[s].w, c = this.m_velocities[n].v, p = this.m_velocities[n].w, f = o.normal, d = o.tangent, y = 0; y < _; ++y) {
                    var b = o.points[y];
                    i.AddVV(i.MulSV(b.normalImpulse, f, i.s_t0), i.MulSV(b.tangentImpulse, d, i.s_t1), t), u -= a * i.CrossVV(b.rA, t), h.SelfMulSub(r, t), p += m * i.CrossVV(b.rB, t), c.SelfMulAdd(l, t)
                }
                this.m_velocities[s].w = u, this.m_velocities[n].w = p
            }
        }, b2ContactSolver.prototype.SolveVelocityConstraints = function () {
            for (var t = b2ContactSolver.SolveVelocityConstraints_s_dv, e = b2ContactSolver.SolveVelocityConstraints_s_dv1, o = b2ContactSolver.SolveVelocityConstraints_s_dv2, n = b2ContactSolver.SolveVelocityConstraints_s_P, r = b2ContactSolver.SolveVelocityConstraints_s_a, a = b2ContactSolver.SolveVelocityConstraints_s_b, l = b2ContactSolver.SolveVelocityConstraints_s_x, m = b2ContactSolver.SolveVelocityConstraints_s_d, _ = b2ContactSolver.SolveVelocityConstraints_s_P1, h = b2ContactSolver.SolveVelocityConstraints_s_P2, u = b2ContactSolver.SolveVelocityConstraints_s_P1P2, c = 0; c < this.m_count; ++c) {
                for (var p = this.m_velocityConstraints[c], f = p.indexA, d = p.indexB, y = p.invMassA, b = p.invIA, v = p.invMassB, S = p.invIB, x = p.pointCount, C = this.m_velocities[f].v, A = this.m_velocities[f].w, B = this.m_velocities[d].v, V = this.m_velocities[d].w, g = p.normal, P = p.tangent, w = p.friction, M = 0; M < x; ++M) {
                    var I = p.points[M];
                    i.SubVV(i.AddVCrossSV(B, V, I.rB, i.s_t0), i.AddVCrossSV(C, A, I.rA, i.s_t1), t);
                    var D = i.DotVV(t, P) - p.tangentSpeed,
                        G = I.tangentMass * -D,
                        F = w * I.normalImpulse;
                    G = (R = b2Clamp(I.tangentImpulse + G, -F, F)) - I.tangentImpulse, I.tangentImpulse = R, i.MulSV(G, P, n), C.SelfMulSub(y, n), A -= b * i.CrossVV(I.rA, n), B.SelfMulAdd(v, n), V += S * i.CrossVV(I.rB, n)
                }
                if (1 === p.pointCount) {
                    I = p.points[0];
                    i.SubVV(i.AddVCrossSV(B, V, I.rB, i.s_t0), i.AddVCrossSV(C, A, I.rA, i.s_t1), t);
                    var R, J = i.DotVV(t, g);
                    G = -I.normalMass * (J - I.velocityBias);
                    G = (R = b2Max(I.normalImpulse + G, 0)) - I.normalImpulse, I.normalImpulse = R, i.MulSV(G, g, n), C.SelfMulSub(y, n), A -= b * i.CrossVV(I.rA, n), B.SelfMulAdd(v, n), V += S * i.CrossVV(I.rB, n)
                } else {
                    var T = p.points[0],
                        L = p.points[1];
                    r.Set(T.normalImpulse, L.normalImpulse), i.SubVV(i.AddVCrossSV(B, V, T.rB, i.s_t0), i.AddVCrossSV(C, A, T.rA, i.s_t1), e), i.SubVV(i.AddVCrossSV(B, V, L.rB, i.s_t0), i.AddVCrossSV(C, A, L.rA, i.s_t1), o);
                    var k = i.DotVV(e, g),
                        q = i.DotVV(o, g);
                    for (a.x = k - T.velocityBias, a.y = q - L.velocityBias, a.SelfSub(s.MulMV(p.K, r, i.s_t0));;) {
                        if (s.MulMV(p.normalMass, a, l).SelfNeg(), l.x >= 0 && l.y >= 0) {
                            i.SubVV(l, r, m), i.MulSV(m.x, g, _), i.MulSV(m.y, g, h), i.AddVV(_, h, u), C.SelfMulSub(y, u), A -= b * (i.CrossVV(T.rA, _) + i.CrossVV(L.rA, h)), B.SelfMulAdd(v, u), V += S * (i.CrossVV(T.rB, _) + i.CrossVV(L.rB, h)), T.normalImpulse = l.x, L.normalImpulse = l.y;
                            break
                        }
                        if (l.x = -T.normalMass * a.x, l.y = 0, k = 0, q = p.K.ex.y * l.x + a.y, l.x >= 0 && q >= 0) {
                            i.SubVV(l, r, m), i.MulSV(m.x, g, _), i.MulSV(m.y, g, h), i.AddVV(_, h, u), C.SelfMulSub(y, u), A -= b * (i.CrossVV(T.rA, _) + i.CrossVV(L.rA, h)), B.SelfMulAdd(v, u), V += S * (i.CrossVV(T.rB, _) + i.CrossVV(L.rB, h)), T.normalImpulse = l.x, L.normalImpulse = l.y;
                            break
                        }
                        if (l.x = 0, l.y = -L.normalMass * a.y, k = p.K.ey.x * l.y + a.x, q = 0, l.y >= 0 && k >= 0) {
                            i.SubVV(l, r, m), i.MulSV(m.x, g, _), i.MulSV(m.y, g, h), i.AddVV(_, h, u), C.SelfMulSub(y, u), A -= b * (i.CrossVV(T.rA, _) + i.CrossVV(L.rA, h)), B.SelfMulAdd(v, u), V += S * (i.CrossVV(T.rB, _) + i.CrossVV(L.rB, h)), T.normalImpulse = l.x, L.normalImpulse = l.y;
                            break
                        }
                        if (l.x = 0, l.y = 0, k = a.x, q = a.y, k >= 0 && q >= 0) {
                            i.SubVV(l, r, m), i.MulSV(m.x, g, _), i.MulSV(m.y, g, h), i.AddVV(_, h, u), C.SelfMulSub(y, u), A -= b * (i.CrossVV(T.rA, _) + i.CrossVV(L.rA, h)), B.SelfMulAdd(v, u), V += S * (i.CrossVV(T.rB, _) + i.CrossVV(L.rB, h)), T.normalImpulse = l.x, L.normalImpulse = l.y;
                            break
                        }
                        break
                    }
                }
                this.m_velocities[f].w = A, this.m_velocities[d].w = V
            }
        }, b2ContactSolver.prototype.StoreImpulses = function () {
            for (var t = 0; t < this.m_count; ++t)
                for (var e = this.m_velocityConstraints[t], i = this.m_contacts[e.contactIndex].GetManifold(), o = 0; o < e.pointCount; ++o) i.points[o].normalImpulse = e.points[o].normalImpulse, i.points[o].tangentImpulse = e.points[o].tangentImpulse
        }, b2ContactSolver.prototype.SolvePositionConstraints = function () {
            for (var e = b2ContactSolver.SolvePositionConstraints_s_xfA, o = b2ContactSolver.SolvePositionConstraints_s_xfB, s = b2ContactSolver.SolvePositionConstraints_s_psm, n = b2ContactSolver.SolvePositionConstraints_s_rA, a = b2ContactSolver.SolvePositionConstraints_s_rB, l = b2ContactSolver.SolvePositionConstraints_s_P, m = 0, _ = 0; _ < this.m_count; ++_) {
                for (var h = this.m_positionConstraints[_], u = h.indexA, c = h.indexB, p = h.localCenterA, f = h.invMassA, d = h.invIA, y = h.localCenterB, b = h.invMassB, v = h.invIB, S = h.pointCount, x = this.m_positions[u].c, C = this.m_positions[u].a, A = this.m_positions[c].c, B = this.m_positions[c].a, V = 0; V < S; ++V) {
                    e.q.SetAngle(C), o.q.SetAngle(B), i.SubVV(x, r.MulRV(e.q, p, i.s_t0), e.p), i.SubVV(A, r.MulRV(o.q, y, i.s_t0), o.p), s.Initialize(h, e, o, V);
                    var g = s.normal,
                        P = s.point,
                        w = s.separation;
                    i.SubVV(P, x, n), i.SubVV(P, A, a), m = b2Min(m, w);
                    var M = b2Clamp(t.b2_baumgarte * (w + t.b2_linearSlop), -t.b2_maxLinearCorrection, 0),
                        I = i.CrossVV(n, g),
                        D = i.CrossVV(a, g),
                        G = f + b + d * I * I + v * D * D,
                        F = G > 0 ? -M / G : 0;
                    i.MulSV(F, g, l), x.SelfMulSub(f, l), C -= d * i.CrossVV(n, l), A.SelfMulAdd(b, l), B += v * i.CrossVV(a, l)
                }
                this.m_positions[u].a = C, this.m_positions[c].a = B
            }
            return m > -3 * t.b2_linearSlop
        }, b2ContactSolver.prototype.SolveTOIPositionConstraints = function (e, o) {
            for (var s = b2ContactSolver.SolveTOIPositionConstraints_s_xfA, n = b2ContactSolver.SolveTOIPositionConstraints_s_xfB, a = b2ContactSolver.SolveTOIPositionConstraints_s_psm, l = b2ContactSolver.SolveTOIPositionConstraints_s_rA, m = b2ContactSolver.SolveTOIPositionConstraints_s_rB, _ = b2ContactSolver.SolveTOIPositionConstraints_s_P, h = 0, u = 0; u < this.m_count; ++u) {
                var c = this.m_positionConstraints[u],
                    p = c.indexA,
                    f = c.indexB,
                    d = c.localCenterA,
                    y = c.localCenterB,
                    b = c.pointCount,
                    v = 0,
                    S = 0;
                p !== e && p !== o || (v = c.invMassA, S = c.invIA);
                var x = 0,
                    C = 0;
                f !== e && f !== o || (x = c.invMassB, C = c.invIB);
                for (var A = this.m_positions[p].c, B = this.m_positions[p].a, V = this.m_positions[f].c, g = this.m_positions[f].a, P = 0; P < b; ++P) {
                    s.q.SetAngle(B), n.q.SetAngle(g), i.SubVV(A, r.MulRV(s.q, d, i.s_t0), s.p), i.SubVV(V, r.MulRV(n.q, y, i.s_t0), n.p), a.Initialize(c, s, n, P);
                    var w = a.normal,
                        M = a.point,
                        I = a.separation;
                    i.SubVV(M, A, l), i.SubVV(M, V, m), h = b2Min(h, I);
                    var D = b2Clamp(t.b2_toiBaumgarte * (I + t.b2_linearSlop), -t.b2_maxLinearCorrection, 0),
                        G = i.CrossVV(l, w),
                        F = i.CrossVV(m, w),
                        R = v + x + S * G * G + C * F * F,
                        J = R > 0 ? -D / R : 0;
                    i.MulSV(J, w, _), A.SelfMulSub(v, _), B -= S * i.CrossVV(l, _), V.SelfMulAdd(x, _), g += C * i.CrossVV(m, _)
                }
                this.m_positions[p].a = B, this.m_positions[f].a = g
            }
            return h >= -1.5 * t.b2_linearSlop
        }, b2ContactSolver.InitializeVelocityConstraints_s_xfA = new a, b2ContactSolver.InitializeVelocityConstraints_s_xfB = new a, b2ContactSolver.InitializeVelocityConstraints_s_worldManifold = new T, b2ContactSolver.WarmStart_s_P = new i, b2ContactSolver.SolveVelocityConstraints_s_dv = new i, b2ContactSolver.SolveVelocityConstraints_s_dv1 = new i, b2ContactSolver.SolveVelocityConstraints_s_dv2 = new i, b2ContactSolver.SolveVelocityConstraints_s_P = new i, b2ContactSolver.SolveVelocityConstraints_s_a = new i, b2ContactSolver.SolveVelocityConstraints_s_b = new i, b2ContactSolver.SolveVelocityConstraints_s_x = new i, b2ContactSolver.SolveVelocityConstraints_s_d = new i, b2ContactSolver.SolveVelocityConstraints_s_P1 = new i, b2ContactSolver.SolveVelocityConstraints_s_P2 = new i, b2ContactSolver.SolveVelocityConstraints_s_P1P2 = new i, b2ContactSolver.SolvePositionConstraints_s_xfA = new a, b2ContactSolver.SolvePositionConstraints_s_xfB = new a, b2ContactSolver.SolvePositionConstraints_s_psm = new oe, b2ContactSolver.SolvePositionConstraints_s_rA = new i, b2ContactSolver.SolvePositionConstraints_s_rB = new i, b2ContactSolver.SolvePositionConstraints_s_P = new i, b2ContactSolver.SolveTOIPositionConstraints_s_xfA = new a, b2ContactSolver.SolveTOIPositionConstraints_s_xfB = new a, b2ContactSolver.SolveTOIPositionConstraints_s_psm = new oe, b2ContactSolver.SolveTOIPositionConstraints_s_rA = new i, b2ContactSolver.SolveTOIPositionConstraints_s_rB = new i, b2ContactSolver.SolveTOIPositionConstraints_s_P = new i, b2ContactSolver
    }();
    t.b2ContactSolver = se;
    var ne = function () {
        return function () {
            this.flags = 0, this.position = new i, this.velocity = new i, this.color = new m, this.lifetime = 0, this.userData = null, this.group = null
        }
    }();

    function b2CalculateParticleIterations(t, e, i) {
        return b2Clamp(Math.ceil(Math.sqrt(t / (.01 * e)) * i), 1, 8)
    }
    t.b2ParticleDef = ne, t.b2CalculateParticleIterations = b2CalculateParticleIterations;
    var re = function () {
        function b2ParticleHandle() {
            this.m_index = t.b2_invalidParticleIndex
        }
        return b2ParticleHandle.prototype.GetIndex = function () {
            return this.m_index
        }, b2ParticleHandle.prototype.SetIndex = function (t) {
            this.m_index = t
        }, b2ParticleHandle
    }();
    t.b2ParticleHandle = re;
    var ae = function () {
        function b2StackQueue(t) {
            this.m_front = 0, this.m_back = 0, this.m_capacity = 0, this.m_buffer = b2MakeArray(t, function (t) {
                return null
            }), this.m_capacity = t
        }
        return b2StackQueue.prototype.Push = function (t) {
            if (this.m_back >= this.m_capacity) {
                for (var e = this.m_front; e < this.m_back; e++) this.m_buffer[e - this.m_front] = this.m_buffer[e];
                this.m_back -= this.m_front, this.m_front = 0, this.m_back >= this.m_capacity && (this.m_capacity > 0 ? (this.m_buffer.concat(b2MakeArray(this.m_capacity, function (t) {
                    return null
                })), this.m_capacity *= 2) : (this.m_buffer.concat(b2MakeArray(1, function (t) {
                    return null
                })), this.m_capacity = 1))
            }
            this.m_buffer[this.m_back] = t, this.m_back++
        }, b2StackQueue.prototype.Pop = function () {
            b2Assert(this.m_front < this.m_back), delete this.m_buffer[this.m_front], this.m_front++
        }, b2StackQueue.prototype.Empty = function () {
            return b2Assert(this.m_front <= this.m_back), this.m_front === this.m_back
        }, b2StackQueue.prototype.Front = function () {
            return this.m_buffer[this.m_front]
        }, b2StackQueue
    }();
    t.b2StackQueue = ae;
    var le = function () {
        function b2VoronoiDiagram(t) {
            this.m_generatorBuffer = null, this.m_generatorCapacity = 0, this.m_generatorCount = 0, this.m_countX = 0, this.m_countY = 0, this.m_diagram = null, this.m_generatorBuffer = b2MakeArray(t, function (t) {
                return new b2VoronoiDiagram.Generator
            }), this.m_generatorCapacity = t
        }
        return b2VoronoiDiagram.prototype.AddGenerator = function (t, e, i) {
            b2Assert(this.m_generatorCount < this.m_generatorCapacity);
            var o = this.m_generatorBuffer[this.m_generatorCount++];
            o.center.Copy(t), o.tag = e, o.necessary = i
        }, b2VoronoiDiagram.prototype.Generate = function (e, o) {
            b2Assert(null === this.m_diagram);
            for (var s = 1 / e, n = new i(+t.b2_maxFloat, +t.b2_maxFloat), r = new i(-t.b2_maxFloat, -t.b2_maxFloat), a = 0, l = 0; l < this.m_generatorCount; l++) {
                (c = this.m_generatorBuffer[l]).necessary && (i.MinV(n, c.center, n), i.MaxV(r, c.center, r), ++a)
            }
            if (0 === a) return this.m_countX = 0, void(this.m_countY = 0);
            n.x -= o, n.y -= o, r.x += o, r.y += o, this.m_countX = 1 + Math.floor(s * (r.x - n.x)), this.m_countY = 1 + Math.floor(s * (r.y - n.y)), this.m_diagram = b2MakeArray(this.m_countX * this.m_countY, function (t) {
                return null
            });
            var m = new ae(4 * this.m_countX * this.m_countY);
            for (l = 0; l < this.m_generatorCount; l++) {
                (c = this.m_generatorBuffer[l]).center.SelfSub(n).SelfMul(s);
                var _ = Math.floor(c.center.x),
                    h = Math.floor(c.center.y);
                _ >= 0 && h >= 0 && _ < this.m_countX && h < this.m_countY && m.Push(new b2VoronoiDiagram.Task(_, h, _ + h * this.m_countX, c))
            }
            for (; !m.Empty();) {
                _ = (p = m.Front()).m_x, h = p.m_y;
                var u = p.m_i,
                    c = p.m_generator;
                m.Pop(), this.m_diagram[u] || (this.m_diagram[u] = c, _ > 0 && m.Push(new b2VoronoiDiagram.Task(_ - 1, h, u - 1, c)), h > 0 && m.Push(new b2VoronoiDiagram.Task(_, h - 1, u - this.m_countX, c)), _ < this.m_countX - 1 && m.Push(new b2VoronoiDiagram.Task(_ + 1, h, u + 1, c)), h < this.m_countY - 1 && m.Push(new b2VoronoiDiagram.Task(_, h + 1, u + this.m_countX, c)))
            }
            for (h = 0; h < this.m_countY; h++)
                for (_ = 0; _ < this.m_countX - 1; _++) {
                    u = _ + h * this.m_countX;
                    (f = this.m_diagram[u]) !== (d = this.m_diagram[u + 1]) && (m.Push(new b2VoronoiDiagram.Task(_, h, u, d)), m.Push(new b2VoronoiDiagram.Task(_ + 1, h, u + 1, f)))
                }
            for (h = 0; h < this.m_countY - 1; h++)
                for (_ = 0; _ < this.m_countX; _++) {
                    u = _ + h * this.m_countX;
                    (f = this.m_diagram[u]) !== (d = this.m_diagram[u + this.m_countX]) && (m.Push(new b2VoronoiDiagram.Task(_, h, u, d)), m.Push(new b2VoronoiDiagram.Task(_, h + 1, u + this.m_countX, f)))
                }
            for (; !m.Empty();) {
                var p, f, d;
                _ = (p = m.Front()).m_x, h = p.m_y, u = p.m_i, l = p.m_generator;
                if (m.Pop(), (f = this.m_diagram[u]) !== (d = l)) {
                    var y = f.center.x - _,
                        b = f.center.y - h,
                        v = d.center.x - _,
                        S = d.center.y - h;
                    y * y + b * b > v * v + S * S && (this.m_diagram[u] = d, _ > 0 && m.Push(new b2VoronoiDiagram.Task(_ - 1, h, u - 1, d)), h > 0 && m.Push(new b2VoronoiDiagram.Task(_, h - 1, u - this.m_countX, d)), _ < this.m_countX - 1 && m.Push(new b2VoronoiDiagram.Task(_ + 1, h, u + 1, d)), h < this.m_countY - 1 && m.Push(new b2VoronoiDiagram.Task(_, h + 1, u + this.m_countX, d)))
                }
            }
        }, b2VoronoiDiagram.prototype.GetNodes = function (t) {
            for (var e = 0; e < this.m_countY - 1; e++)
                for (var i = 0; i < this.m_countX - 1; i++) {
                    var o = i + e * this.m_countX,
                        s = this.m_diagram[o],
                        n = this.m_diagram[o + 1],
                        r = this.m_diagram[o + this.m_countX],
                        a = this.m_diagram[o + 1 + this.m_countX];
                    n !== r && (s !== n && s !== r && (s.necessary || n.necessary || r.necessary) && t(s.tag, n.tag, r.tag), a !== n && a !== r && (s.necessary || n.necessary || r.necessary) && t(n.tag, a.tag, r.tag))
                }
        }, b2VoronoiDiagram
    }();

    function std_iter_swap(t, e, i) {
        var o = t[e];
        t[e] = t[i], t[i] = o
    }

    function default_compare(t, e) {
        return t < e
    }

    function std_sort(t, e, i, o) {
        void 0 === e && (e = 0), void 0 === i && (i = t.length - e), void 0 === o && (o = default_compare);
        for (var s = e, n = [], r = 0;;) {
            for (; s + 1 < i; i++) {
                var a = t[s + Math.floor(Math.random() * (i - s))];
                n[r++] = i;
                for (var l = s - 1;;) {
                    for (; o(t[++l], a););
                    for (; o(a, t[--i]););
                    if (l >= i) break;
                    std_iter_swap(t, l, i)
                }
            }
            if (0 === r) break;
            s = i, i = n[--r]
        }
        return t
    }

    function std_stable_sort(t, e, i, o) {
        return void 0 === e && (e = 0), void 0 === i && (i = t.length - e), void 0 === o && (o = default_compare), std_sort(t, e, i, o)
    }

    function std_remove_if(t, e, i) {
        void 0 === i && (i = t.length);
        for (var o = 0, s = 0; s < i; ++s) e(t[s]) || (s !== o ? std_iter_swap(t, o++, s) : ++o);
        return o
    }

    function std_lower_bound(t, e, i, o, s) {
        void 0 === s && (s = default_compare);
        for (var n = i - e; n > 0;) {
            var r = Math.floor(n / 2),
                a = e + r;
            s(t[a], o) ? (e = ++a, n -= r + 1) : n = r
        }
        return e
    }

    function std_upper_bound(t, e, i, o, s) {
        void 0 === s && (s = default_compare);
        for (var n = i - e; n > 0;) {
            var r = Math.floor(n / 2),
                a = e + r;
            s(o, t[a]) ? n = r : (e = ++a, n -= r + 1)
        }
        return e
    }

    function std_rotate(t, e, i, o) {
        for (var s = i; e !== s;) std_iter_swap(t, e++, s++), s === o ? s = i : e === i && (i = s)
    }
    t.b2VoronoiDiagram = le,
        function (t) {
            var e = function () {
                return function () {
                    this.center = new i, this.tag = 0, this.necessary = !1
                }
            }();
            t.Generator = e;
            var o = function () {
                return function (t, e, i, o) {
                    this.m_x = 0, this.m_y = 0, this.m_i = 0, this.m_generator = null, this.m_x = t, this.m_y = e, this.m_i = i, this.m_generator = o
                }
            }();
            t.Task = o
        }(le = t.b2VoronoiDiagram || (t.b2VoronoiDiagram = {}));
    var me = function () {
        function b2GrowableBuffer(t) {
            this.data = [], this.count = 0, this.capacity = 0, this.allocator = t
        }
        return b2GrowableBuffer.prototype.Append = function () {
            return this.count >= this.capacity && this.Grow(), this.count++
        }, b2GrowableBuffer.prototype.Reserve = function (t) {
            if (!(this.capacity >= t)) {
                b2Assert(this.capacity === this.data.length);
                for (var e = this.capacity; e < t; ++e) this.data[e] = this.allocator();
                this.capacity = t
            }
        }, b2GrowableBuffer.prototype.Grow = function () {
            var e = this.capacity ? 2 * this.capacity : t.b2_minParticleSystemBufferCapacity;
            b2Assert(e > this.capacity), this.Reserve(e)
        }, b2GrowableBuffer.prototype.Free = function () {
            0 !== this.data.length && (this.data = [], this.capacity = 0, this.count = 0)
        }, b2GrowableBuffer.prototype.Shorten = function (t) {
            b2Assert(!1)
        }, b2GrowableBuffer.prototype.Data = function () {
            return this.data
        }, b2GrowableBuffer.prototype.GetCount = function () {
            return this.count
        }, b2GrowableBuffer.prototype.SetCount = function (t) {
            this.count = t
        }, b2GrowableBuffer.prototype.GetCapacity = function () {
            return this.capacity
        }, b2GrowableBuffer.prototype.RemoveIf = function (t) {
            for (var e = 0, i = 0; i < this.count; ++i) t(this.data[i]) || e++;
            this.count = std_remove_if(this.data, t, this.count), b2Assert(e === this.count)
        }, b2GrowableBuffer.prototype.Unique = function (t) {
            this.count = function (t, e, i, o) {
                if (e === i) return i;
                for (var s = e; ++e !== i;) o(t[s], t[e]) || std_iter_swap(t, ++s, e);
                return ++s
            }(this.data, 0, this.count, t)
        }, b2GrowableBuffer
    }();
    t.b2GrowableBuffer = me;
    var _e = function () {
        function b2QueryCallback() {}
        return b2QueryCallback.prototype.ReportFixture = function (t) {
            return !0
        }, b2QueryCallback.prototype.ReportParticle = function (t, e) {
            return !1
        }, b2QueryCallback.prototype.ShouldQueryParticleSystem = function (t) {
            return !0
        }, b2QueryCallback
    }();
    t.b2QueryCallback = _e;
    var he = function (t) {
        function b2FixtureParticleQueryCallback(e) {
            var i = t.call(this) || this;
            return i.m_system = e, i
        }
        return __extends(b2FixtureParticleQueryCallback, t), b2FixtureParticleQueryCallback.prototype.ShouldQueryParticleSystem = function (t) {
            return !1
        }, b2FixtureParticleQueryCallback.prototype.ReportFixture = function (t) {
            if (t.IsSensor()) return !0;
            for (var e = t.GetShape().GetChildCount(), i = 0; i < e; i++)
                for (var o = t.GetAABB(i), s = this.m_system.GetInsideBoundsEnumerator(o), n = void 0;
                    (n = s.GetNext()) >= 0;) this.ReportFixtureAndParticle(t, i, n);
            return !0
        }, b2FixtureParticleQueryCallback.prototype.ReportParticle = function (t, e) {
            return !1
        }, b2FixtureParticleQueryCallback.prototype.ReportFixtureAndParticle = function (t, e, i) {
            b2Assert(!1)
        }, b2FixtureParticleQueryCallback
    }(_e);
    t.b2FixtureParticleQueryCallback = he;
    var ue = function () {
        function b2ParticleContact() {
            this.indexA = 0, this.indexB = 0, this.weight = 0, this.normal = new i, this.flags = 0
        }
        return b2ParticleContact.prototype.SetIndices = function (e, i) {
            b2Assert(e <= t.b2_maxParticleIndex && i <= t.b2_maxParticleIndex), this.indexA = e, this.indexB = i
        }, b2ParticleContact.prototype.SetWeight = function (t) {
            this.weight = t
        }, b2ParticleContact.prototype.SetNormal = function (t) {
            this.normal.Copy(t)
        }, b2ParticleContact.prototype.SetFlags = function (t) {
            this.flags = t
        }, b2ParticleContact.prototype.GetIndexA = function () {
            return this.indexA
        }, b2ParticleContact.prototype.GetIndexB = function () {
            return this.indexB
        }, b2ParticleContact.prototype.GetWeight = function () {
            return this.weight
        }, b2ParticleContact.prototype.GetNormal = function () {
            return this.normal
        }, b2ParticleContact.prototype.GetFlags = function () {
            return this.flags
        }, b2ParticleContact.prototype.IsEqual = function (t) {
            return this.indexA === t.indexA && this.indexB === t.indexB && this.flags === t.flags && this.weight === t.weight && this.normal.x === t.normal.x && this.normal.y === t.normal.y
        }, b2ParticleContact.prototype.IsNotEqual = function (t) {
            return !this.IsEqual(t)
        }, b2ParticleContact.prototype.ApproximatelyEqual = function (t) {
            return this.indexA === t.indexA && this.indexB === t.indexB && this.flags === t.flags && b2Abs(this.weight - t.weight) < .01 && i.DistanceSquaredVV(this.normal, t.normal) < 1e-4
        }, b2ParticleContact
    }();
    t.b2ParticleContact = ue;
    var ce = function () {
        return function () {
            this.index = 0, this.body = null, this.fixture = null, this.weight = 0, this.normal = new i, this.mass = 0
        }
    }();
    t.b2ParticleBodyContact = ce;
    var pe = function () {
        return function () {
            this.indexA = 0, this.indexB = 0, this.flags = 0, this.strength = 0, this.distance = 0
        }
    }();
    t.b2ParticlePair = pe;
    var fe = function () {
        return function () {
            this.indexA = 0, this.indexB = 0, this.indexC = 0, this.flags = 0, this.strength = 0, this.pa = new i(0, 0), this.pb = new i(0, 0), this.pc = new i(0, 0), this.ka = 0, this.kb = 0, this.kc = 0, this.s = 0
        }
    }();
    t.b2ParticleTriad = fe;
    var de = function () {
        function b2ParticleSystemDef() {
            this.strictContactCheck = !1, this.density = 1, this.gravityScale = 1, this.radius = 1, this.maxCount = 0, this.pressureStrength = .005, this.dampingStrength = 1, this.elasticStrength = .25, this.springStrength = .25, this.viscousStrength = .25, this.surfaceTensionPressureStrength = .2, this.surfaceTensionNormalStrength = .2, this.repulsiveStrength = 1, this.powderStrength = .5, this.ejectionStrength = .5, this.staticPressureStrength = .2, this.staticPressureRelaxation = .2, this.staticPressureIterations = 8, this.colorMixingStrength = .5, this.destroyByAge = !0, this.lifetimeGranularity = 1 / 60
        }
        return b2ParticleSystemDef.prototype.Copy = function (t) {
            return this.strictContactCheck = t.strictContactCheck, this.density = t.density, this.gravityScale = t.gravityScale, this.radius = t.radius, this.maxCount = t.maxCount, this.pressureStrength = t.pressureStrength, this.dampingStrength = t.dampingStrength, this.elasticStrength = t.elasticStrength, this.springStrength = t.springStrength, this.viscousStrength = t.viscousStrength, this.surfaceTensionPressureStrength = t.surfaceTensionPressureStrength, this.surfaceTensionNormalStrength = t.surfaceTensionNormalStrength, this.repulsiveStrength = t.repulsiveStrength, this.powderStrength = t.powderStrength, this.ejectionStrength = t.ejectionStrength, this.staticPressureStrength = t.staticPressureStrength, this.staticPressureRelaxation = t.staticPressureRelaxation, this.staticPressureIterations = t.staticPressureIterations, this.colorMixingStrength = t.colorMixingStrength, this.destroyByAge = t.destroyByAge, this.lifetimeGranularity = t.lifetimeGranularity, this
        }, b2ParticleSystemDef.prototype.Clone = function () {
            return (new b2ParticleSystemDef).Copy(this)
        }, b2ParticleSystemDef
    }();
    t.b2ParticleSystemDef = de;
    var ye = function () {
        function b2ParticleSystem(t, e) {
            this.m_paused = !1, this.m_timestamp = 0, this.m_allParticleFlags = 0, this.m_needsUpdateAllParticleFlags = !1, this.m_allGroupFlags = 0, this.m_needsUpdateAllGroupFlags = !1, this.m_hasForce = !1, this.m_iterationIndex = 0, this.m_inverseDensity = 0, this.m_particleDiameter = 0, this.m_inverseDiameter = 0, this.m_squaredDiameter = 0, this.m_count = 0, this.m_internalAllocatedCapacity = 0, this.m_handleIndexBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_flagsBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_positionBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_velocityBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_forceBuffer = [], this.m_weightBuffer = [], this.m_staticPressureBuffer = [], this.m_accumulationBuffer = [], this.m_accumulation2Buffer = [], this.m_depthBuffer = [], this.m_colorBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_groupBuffer = [], this.m_userDataBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_stuckThreshold = 0, this.m_lastBodyContactStepBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_bodyContactCountBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_consecutiveContactStepsBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_stuckParticleBuffer = new me(function () {
                return 0
            }), this.m_proxyBuffer = new me(function () {
                return new b2ParticleSystem.Proxy
            }), this.m_contactBuffer = new me(function () {
                return new ue
            }), this.m_bodyContactBuffer = new me(function () {
                return new ce
            }), this.m_pairBuffer = new me(function () {
                return new pe
            }), this.m_triadBuffer = new me(function () {
                return new fe
            }), this.m_expirationTimeBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_indexByExpirationTimeBuffer = new b2ParticleSystem.UserOverridableBuffer, this.m_timeElapsed = 0, this.m_expirationTimeBufferRequiresSorting = !1, this.m_groupCount = 0, this.m_groupList = null, this.m_def = new de, this.m_world = null, this.m_prev = null, this.m_next = null, this.SetStrictContactCheck(t.strictContactCheck), this.SetDensity(t.density), this.SetGravityScale(t.gravityScale), this.SetRadius(t.radius), this.SetMaxParticleCount(t.maxCount), b2Assert(t.lifetimeGranularity > 0), this.m_def = t.Clone(), this.m_world = e, this.SetDestructionByAge(this.m_def.destroyByAge)
        }
        return b2ParticleSystem.computeTag = function (t, e) {
            return (e + b2ParticleSystem.yOffset >>> 0 << b2ParticleSystem.yShift) + (b2ParticleSystem.xScale * t + b2ParticleSystem.xOffset >>> 0) >>> 0
        }, b2ParticleSystem.computeRelativeTag = function (t, e, i) {
            return t + (i << b2ParticleSystem.yShift) + (e << b2ParticleSystem.xShift) >>> 0
        }, b2ParticleSystem.prototype.Drop = function () {
            for (; this.m_groupList;) this.DestroyParticleGroup(this.m_groupList);
            this.FreeUserOverridableBuffer(this.m_handleIndexBuffer), this.FreeUserOverridableBuffer(this.m_flagsBuffer), this.FreeUserOverridableBuffer(this.m_lastBodyContactStepBuffer), this.FreeUserOverridableBuffer(this.m_bodyContactCountBuffer), this.FreeUserOverridableBuffer(this.m_consecutiveContactStepsBuffer), this.FreeUserOverridableBuffer(this.m_positionBuffer), this.FreeUserOverridableBuffer(this.m_velocityBuffer), this.FreeUserOverridableBuffer(this.m_colorBuffer), this.FreeUserOverridableBuffer(this.m_userDataBuffer), this.FreeUserOverridableBuffer(this.m_expirationTimeBuffer), this.FreeUserOverridableBuffer(this.m_indexByExpirationTimeBuffer), this.FreeBuffer(this.m_forceBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_weightBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_staticPressureBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_accumulationBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_accumulation2Buffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_depthBuffer, this.m_internalAllocatedCapacity), this.FreeBuffer(this.m_groupBuffer, this.m_internalAllocatedCapacity)
        }, b2ParticleSystem.prototype.CreateParticle = function (e) {
            if (b2Assert(!1 === this.m_world.IsLocked()), this.m_world.IsLocked()) return 0;
            if (this.m_count >= this.m_internalAllocatedCapacity) {
                var o = this.m_count ? 2 * this.m_count : t.b2_minParticleSystemBufferCapacity;
                this.ReallocateInternalAllocatedBuffers(o)
            }
            if (this.m_count >= this.m_internalAllocatedCapacity) {
                if (!this.m_def.destroyByAge) return t.b2_invalidParticleIndex;
                this.DestroyOldestParticle(0, !1), this.SolveZombie()
            }
            var s = this.m_count++;
            this.m_flagsBuffer.data[s] = 0, this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[s] = 0), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[s] = 0), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[s] = 0), this.m_positionBuffer.data[s] = (this.m_positionBuffer.data[s] || new i).Copy(e.position), this.m_velocityBuffer.data[s] = (this.m_velocityBuffer.data[s] || new i).Copy(e.velocity), this.m_weightBuffer[s] = 0, this.m_forceBuffer[s] = (this.m_forceBuffer[s] || new i).SetZero(), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[s] = 0), this.m_depthBuffer && (this.m_depthBuffer[s] = 0), !this.m_colorBuffer.data && e.color.IsZero() || (this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data), this.m_colorBuffer.data[s] = (this.m_colorBuffer.data[s] || new m).Copy(e.color)), (this.m_userDataBuffer.data || e.userData) && (this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data), this.m_userDataBuffer.data[s] = e.userData), this.m_handleIndexBuffer.data && (this.m_handleIndexBuffer.data[s] = null);
            var n = this.m_proxyBuffer.data[this.m_proxyBuffer.Append()],
                r = e.lifetime > 0;
            (this.m_expirationTimeBuffer.data || r) && (this.SetParticleLifetime(s, r ? e.lifetime : this.ExpirationTimeToLifetime(-this.GetQuantizedTimeElapsed())), this.m_indexByExpirationTimeBuffer.data[s] = s), n.index = s;
            var a = e.group;
            return this.m_groupBuffer[s] = a, a && (a.m_firstIndex < a.m_lastIndex ? (this.RotateBuffer(a.m_firstIndex, a.m_lastIndex, s), b2Assert(a.m_lastIndex === s), a.m_lastIndex = s + 1) : (a.m_firstIndex = s, a.m_lastIndex = s + 1)), this.SetParticleFlags(s, e.flags), s
        }, b2ParticleSystem.prototype.GetParticleHandleFromIndex = function (e) {
            b2Assert(e >= 0 && e < this.GetParticleCount() && e !== t.b2_invalidParticleIndex), this.m_handleIndexBuffer.data = this.RequestBuffer(this.m_handleIndexBuffer.data);
            var i = this.m_handleIndexBuffer.data[e];
            return i || (b2Assert(null !== (i = new re)), i.SetIndex(e), this.m_handleIndexBuffer.data[e] = i, i)
        }, b2ParticleSystem.prototype.DestroyParticle = function (t, e) {
            void 0 === e && (e = !1);
            var i = 2;
            e && (i |= 512), this.SetParticleFlags(t, this.m_flagsBuffer.data[t] | i)
        }, b2ParticleSystem.prototype.DestroyOldestParticle = function (t, e) {
            void 0 === e && (e = !1);
            var i = this.GetParticleCount();
            b2Assert(t >= 0 && t < i), b2Assert(null !== this.m_indexByExpirationTimeBuffer.data);
            var o = this.m_indexByExpirationTimeBuffer.data[i - (t + 1)],
                s = this.m_indexByExpirationTimeBuffer.data[t];
            this.DestroyParticle(this.m_expirationTimeBuffer.data[o] > 0 ? o : s, e)
        }, b2ParticleSystem.prototype.DestroyParticlesInShape = function (t, e, i) {
            void 0 === i && (i = !1);
            var o = b2ParticleSystem.DestroyParticlesInShape_s_aabb;
            if (b2Assert(!1 === this.m_world.IsLocked()), this.m_world.IsLocked()) return 0;
            var s = new b2ParticleSystem.DestroyParticlesInShapeCallback(this, t, e, i),
                n = o;
            return t.ComputeAABB(n, e, 0), this.m_world.QueryAABB(s, n), s.Destroyed()
        }, b2ParticleSystem.prototype.CreateParticleGroup = function (t) {
            var e = b2ParticleSystem.CreateParticleGroup_s_transform;
            if (b2Assert(!1 === this.m_world.IsLocked()), this.m_world.IsLocked()) return null;
            var i = e;
            i.SetPositionAngle(t.position, t.angle);
            var o = this.m_count;
            if (t.shape && this.CreateParticlesWithShapeForGroup(t.shape, t, i), t.shapes && this.CreateParticlesWithShapesForGroup(t.shapes, t.shapeCount, t, i), t.particleCount) {
                b2Assert(null !== t.positionData);
                for (var s = 0; s < t.particleCount; s++) {
                    var n = t.positionData[s];
                    this.CreateParticleForGroup(t, i, n)
                }
            }
            var r = this.m_count,
                a = new ve;
            a.m_system = this, a.m_firstIndex = o, a.m_lastIndex = r, a.m_strength = t.strength, a.m_userData = t.userData, a.m_transform.Copy(i), a.m_prev = null, a.m_next = this.m_groupList, this.m_groupList && (this.m_groupList.m_prev = a), this.m_groupList = a, ++this.m_groupCount;
            for (s = o; s < r; s++) this.m_groupBuffer[s] = a;
            this.SetGroupFlags(a, t.groupFlags);
            var l = new b2ParticleSystem.ConnectionFilter;
            return this.UpdateContacts(!0), this.UpdatePairsAndTriads(o, r, l), t.group && (this.JoinParticleGroups(t.group, a), a = t.group), a
        }, b2ParticleSystem.prototype.JoinParticleGroups = function (t, e) {
            if (b2Assert(!1 === this.m_world.IsLocked()), !this.m_world.IsLocked()) {
                b2Assert(t !== e), this.RotateBuffer(e.m_firstIndex, e.m_lastIndex, this.m_count), b2Assert(e.m_lastIndex === this.m_count), this.RotateBuffer(t.m_firstIndex, t.m_lastIndex, e.m_firstIndex), b2Assert(t.m_lastIndex === e.m_firstIndex);
                var i = new b2ParticleSystem.JoinParticleGroupsFilter(e.m_firstIndex);
                this.UpdateContacts(!0), this.UpdatePairsAndTriads(t.m_firstIndex, e.m_lastIndex, i);
                for (var o = e.m_firstIndex; o < e.m_lastIndex; o++) this.m_groupBuffer[o] = t;
                var s = t.m_groupFlags | e.m_groupFlags;
                this.SetGroupFlags(t, s), t.m_lastIndex = e.m_lastIndex, e.m_firstIndex = e.m_lastIndex, this.DestroyParticleGroup(e)
            }
        }, b2ParticleSystem.prototype.SplitParticleGroup = function (t) {
            this.UpdateContacts(!0);
            var e = b2MakeArray(t.GetParticleCount(), function (t) {
                return new b2ParticleSystem.ParticleListNode
            });
            b2ParticleSystem.InitializeParticleLists(t, e), this.MergeParticleListsInContact(t, e);
            var i = b2ParticleSystem.FindLongestParticleList(t, e);
            this.MergeZombieParticleListNodes(t, e, i), this.CreateParticleGroupsFromParticleList(t, e, i), this.UpdatePairsAndTriadsWithParticleList(t, e)
        }, b2ParticleSystem.prototype.GetParticleGroupList = function () {
            return this.m_groupList
        }, b2ParticleSystem.prototype.GetParticleGroupCount = function () {
            return this.m_groupCount
        }, b2ParticleSystem.prototype.GetParticleCount = function () {
            return this.m_count
        }, b2ParticleSystem.prototype.GetMaxParticleCount = function () {
            return this.m_def.maxCount
        }, b2ParticleSystem.prototype.SetMaxParticleCount = function (t) {
            b2Assert(this.m_count <= t), this.m_def.maxCount = t
        }, b2ParticleSystem.prototype.GetAllParticleFlags = function () {
            return this.m_allParticleFlags
        }, b2ParticleSystem.prototype.GetAllGroupFlags = function () {
            return this.m_allGroupFlags
        }, b2ParticleSystem.prototype.SetPaused = function (t) {
            this.m_paused = t
        }, b2ParticleSystem.prototype.GetPaused = function () {
            return this.m_paused
        }, b2ParticleSystem.prototype.SetDensity = function (t) {
            this.m_def.density = t, this.m_inverseDensity = 1 / this.m_def.density
        }, b2ParticleSystem.prototype.GetDensity = function () {
            return this.m_def.density
        }, b2ParticleSystem.prototype.SetGravityScale = function (t) {
            this.m_def.gravityScale = t
        }, b2ParticleSystem.prototype.GetGravityScale = function () {
            return this.m_def.gravityScale
        }, b2ParticleSystem.prototype.SetDamping = function (t) {
            this.m_def.dampingStrength = t
        }, b2ParticleSystem.prototype.GetDamping = function () {
            return this.m_def.dampingStrength
        }, b2ParticleSystem.prototype.SetStaticPressureIterations = function (t) {
            this.m_def.staticPressureIterations = t
        }, b2ParticleSystem.prototype.GetStaticPressureIterations = function () {
            return this.m_def.staticPressureIterations
        }, b2ParticleSystem.prototype.SetRadius = function (t) {
            this.m_particleDiameter = 2 * t, this.m_squaredDiameter = this.m_particleDiameter * this.m_particleDiameter, this.m_inverseDiameter = 1 / this.m_particleDiameter
        }, b2ParticleSystem.prototype.GetRadius = function () {
            return this.m_particleDiameter / 2
        }, b2ParticleSystem.prototype.GetPositionBuffer = function () {
            return this.m_positionBuffer.data
        }, b2ParticleSystem.prototype.GetVelocityBuffer = function () {
            return this.m_velocityBuffer.data
        }, b2ParticleSystem.prototype.GetColorBuffer = function () {
            return this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data), this.m_colorBuffer.data
        }, b2ParticleSystem.prototype.GetGroupBuffer = function () {
            return this.m_groupBuffer
        }, b2ParticleSystem.prototype.GetWeightBuffer = function () {
            return this.m_weightBuffer
        }, b2ParticleSystem.prototype.GetUserDataBuffer = function () {
            return this.m_userDataBuffer.data = this.RequestBuffer(this.m_userDataBuffer.data), this.m_userDataBuffer.data
        }, b2ParticleSystem.prototype.GetFlagsBuffer = function () {
            return this.m_flagsBuffer.data
        }, b2ParticleSystem.prototype.SetParticleFlags = function (t, e) {
            this.m_flagsBuffer.data[t] & ~e && (this.m_needsUpdateAllParticleFlags = !0), ~this.m_allParticleFlags & e && (128 & e && (this.m_accumulation2Buffer = this.RequestBuffer(this.m_accumulation2Buffer)), 256 & e && (this.m_colorBuffer.data = this.RequestBuffer(this.m_colorBuffer.data)), this.m_allParticleFlags |= e), this.m_flagsBuffer.data[t] = e
        }, b2ParticleSystem.prototype.GetParticleFlags = function (t) {
            return this.m_flagsBuffer.data[t]
        }, b2ParticleSystem.prototype.SetFlagsBuffer = function (t, e) {
            this.SetUserOverridableBuffer(this.m_flagsBuffer, t, e)
        }, b2ParticleSystem.prototype.SetPositionBuffer = function (t, e) {
            this.SetUserOverridableBuffer(this.m_positionBuffer, t, e)
        }, b2ParticleSystem.prototype.SetVelocityBuffer = function (t, e) {
            this.SetUserOverridableBuffer(this.m_velocityBuffer, t, e)
        }, b2ParticleSystem.prototype.SetColorBuffer = function (t, e) {
            this.SetUserOverridableBuffer(this.m_colorBuffer, t, e)
        }, b2ParticleSystem.prototype.SetUserDataBuffer = function (t, e) {
            this.SetUserOverridableBuffer(this.m_userDataBuffer, t, e)
        }, b2ParticleSystem.prototype.GetContacts = function () {
            return this.m_contactBuffer.data
        }, b2ParticleSystem.prototype.GetContactCount = function () {
            return this.m_contactBuffer.count
        }, b2ParticleSystem.prototype.GetBodyContacts = function () {
            return this.m_bodyContactBuffer.data
        }, b2ParticleSystem.prototype.GetBodyContactCount = function () {
            return this.m_bodyContactBuffer.count
        }, b2ParticleSystem.prototype.GetPairs = function () {
            return this.m_pairBuffer.data
        }, b2ParticleSystem.prototype.GetPairCount = function () {
            return this.m_pairBuffer.count
        }, b2ParticleSystem.prototype.GetTriads = function () {
            return this.m_triadBuffer.data
        }, b2ParticleSystem.prototype.GetTriadCount = function () {
            return this.m_triadBuffer.count
        }, b2ParticleSystem.prototype.SetStuckThreshold = function (t) {
            this.m_stuckThreshold = t, t > 0 && (this.m_lastBodyContactStepBuffer.data = this.RequestBuffer(this.m_lastBodyContactStepBuffer.data), this.m_bodyContactCountBuffer.data = this.RequestBuffer(this.m_bodyContactCountBuffer.data), this.m_consecutiveContactStepsBuffer.data = this.RequestBuffer(this.m_consecutiveContactStepsBuffer.data))
        }, b2ParticleSystem.prototype.GetStuckCandidates = function () {
            return this.m_stuckParticleBuffer.Data()
        }, b2ParticleSystem.prototype.GetStuckCandidateCount = function () {
            return this.m_stuckParticleBuffer.GetCount()
        }, b2ParticleSystem.prototype.ComputeCollisionEnergy = function () {
            for (var t = b2ParticleSystem.ComputeCollisionEnergy_s_v, e = this.m_velocityBuffer.data, o = 0, s = 0; s < this.m_contactBuffer.count; s++) {
                var n = this.m_contactBuffer.data[s],
                    r = n.indexA,
                    a = n.indexB,
                    l = n.normal,
                    m = i.SubVV(e[a], e[r], t),
                    _ = i.DotVV(m, l);
                _ < 0 && (o += _ * _)
            }
            return .5 * this.GetParticleMass() * o
        }, b2ParticleSystem.prototype.SetStrictContactCheck = function (t) {
            this.m_def.strictContactCheck = t
        }, b2ParticleSystem.prototype.GetStrictContactCheck = function () {
            return this.m_def.strictContactCheck
        }, b2ParticleSystem.prototype.SetParticleLifetime = function (t, e) {
            b2Assert(this.ValidateParticleIndex(t));
            var i = null === this.m_indexByExpirationTimeBuffer.data;
            if (this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data), this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data), i)
                for (var o = this.GetParticleCount(), s = 0; s < o; ++s) this.m_indexByExpirationTimeBuffer.data[s] = s;
            var n = e / this.m_def.lifetimeGranularity,
                r = n > 0 ? this.GetQuantizedTimeElapsed() + n : n;
            r !== this.m_expirationTimeBuffer.data[t] && (this.m_expirationTimeBuffer.data[t] = r, this.m_expirationTimeBufferRequiresSorting = !0)
        }, b2ParticleSystem.prototype.GetParticleLifetime = function (t) {
            return b2Assert(this.ValidateParticleIndex(t)), this.ExpirationTimeToLifetime(this.GetExpirationTimeBuffer()[t])
        }, b2ParticleSystem.prototype.SetDestructionByAge = function (t) {
            t && this.GetExpirationTimeBuffer(), this.m_def.destroyByAge = t
        }, b2ParticleSystem.prototype.GetDestructionByAge = function () {
            return this.m_def.destroyByAge
        }, b2ParticleSystem.prototype.GetExpirationTimeBuffer = function () {
            return this.m_expirationTimeBuffer.data = this.RequestBuffer(this.m_expirationTimeBuffer.data), this.m_expirationTimeBuffer.data
        }, b2ParticleSystem.prototype.ExpirationTimeToLifetime = function (t) {
            return (t > 0 ? t - this.GetQuantizedTimeElapsed() : t) * this.m_def.lifetimeGranularity
        }, b2ParticleSystem.prototype.GetIndexByExpirationTimeBuffer = function () {
            return this.GetParticleCount() ? this.SetParticleLifetime(0, this.GetParticleLifetime(0)) : this.m_indexByExpirationTimeBuffer.data = this.RequestBuffer(this.m_indexByExpirationTimeBuffer.data), this.m_indexByExpirationTimeBuffer.data
        }, b2ParticleSystem.prototype.ParticleApplyLinearImpulse = function (t, e) {
            this.ApplyLinearImpulse(t, t + 1, e)
        }, b2ParticleSystem.prototype.ApplyLinearImpulse = function (t, e, i) {
            for (var o = this.m_velocityBuffer.data, s = (e - t) * this.GetParticleMass(), n = i.Clone().SelfMul(1 / s), r = t; r < e; r++) o[r].SelfAdd(n)
        }, b2ParticleSystem.IsSignificantForce = function (t) {
            return 0 !== t.x || 0 !== t.y
        }, b2ParticleSystem.prototype.ParticleApplyForce = function (t, e) {
            b2ParticleSystem.IsSignificantForce(e) && this.ForceCanBeApplied(this.m_flagsBuffer.data[t]) && (this.PrepareForceBuffer(), this.m_forceBuffer[t].SelfAdd(e))
        }, b2ParticleSystem.prototype.ApplyForce = function (t, e, i) {
            var o = i.Clone().SelfMul(1 / (e - t));
            if (b2ParticleSystem.IsSignificantForce(o)) {
                this.PrepareForceBuffer();
                for (var s = t; s < e; s++) this.m_forceBuffer[s].SelfAdd(o)
            }
        }, b2ParticleSystem.prototype.GetNext = function () {
            return this.m_next
        }, b2ParticleSystem.prototype.QueryAABB = function (t, e) {
            if (0 !== this.m_proxyBuffer.count)
                for (var i = this.m_proxyBuffer.count, o = std_lower_bound(this.m_proxyBuffer.data, 0, i, b2ParticleSystem.computeTag(this.m_inverseDiameter * e.lowerBound.x, this.m_inverseDiameter * e.lowerBound.y), b2ParticleSystem.Proxy.CompareProxyTag), s = std_upper_bound(this.m_proxyBuffer.data, o, i, b2ParticleSystem.computeTag(this.m_inverseDiameter * e.upperBound.x, this.m_inverseDiameter * e.upperBound.y), b2ParticleSystem.Proxy.CompareTagProxy), n = this.m_positionBuffer.data, r = o; r < s; ++r) {
                    var a = this.m_proxyBuffer.data[r].index,
                        l = n[a];
                    if (e.lowerBound.x < l.x && l.x < e.upperBound.x && e.lowerBound.y < l.y && l.y < e.upperBound.y && !t.ReportParticle(this, a)) break
                }
        }, b2ParticleSystem.prototype.QueryShapeAABB = function (t, e, i, o) {
            void 0 === o && (o = 0);
            var s = b2ParticleSystem.QueryShapeAABB_s_aabb;
            e.ComputeAABB(s, i, o), this.QueryAABB(t, s)
        }, b2ParticleSystem.prototype.QueryPointAABB = function (e, i, o) {
            void 0 === o && (o = t.b2_linearSlop);
            var s = b2ParticleSystem.QueryPointAABB_s_aabb;
            s.lowerBound.Set(i.x - o, i.y - o), s.upperBound.Set(i.x + o, i.y + o), this.QueryAABB(e, s)
        }, b2ParticleSystem.prototype.RayCast = function (t, e, o) {
            var s = b2ParticleSystem.RayCast_s_aabb,
                n = b2ParticleSystem.RayCast_s_p,
                r = b2ParticleSystem.RayCast_s_v,
                a = b2ParticleSystem.RayCast_s_n,
                l = b2ParticleSystem.RayCast_s_point;
            if (0 !== this.m_proxyBuffer.count) {
                var m = this.m_positionBuffer.data,
                    _ = s;
                i.MinV(e, o, _.lowerBound), i.MaxV(e, o, _.upperBound);
                for (var h, u = 1, c = i.SubVV(o, e, r), p = i.DotVV(c, c), f = this.GetInsideBoundsEnumerator(_);
                    (h = f.GetNext()) >= 0;) {
                    var d = i.SubVV(e, m[h], n),
                        y = i.DotVV(d, c),
                        b = y * y - p * (i.DotVV(d, d) - this.m_squaredDiameter);
                    if (b >= 0) {
                        var v = b2Sqrt(b),
                            S = (-y - v) / p;
                        if (S > u) continue;
                        if (S < 0 && ((S = (-y + v) / p) < 0 || S > u)) continue;
                        var x = i.AddVMulSV(d, S, c, a);
                        if (x.Normalize(), (u = b2Min(u, t.ReportParticle(this, h, i.AddVMulSV(e, S, c, l), x, S))) <= 0) break
                    }
                }
            }
        }, b2ParticleSystem.prototype.ComputeAABB = function (e) {
            var o = this.GetParticleCount();
            b2Assert(null !== e), e.lowerBound.x = +t.b2_maxFloat, e.lowerBound.y = +t.b2_maxFloat, e.upperBound.x = -t.b2_maxFloat, e.upperBound.y = -t.b2_maxFloat;
            for (var s = this.m_positionBuffer.data, n = 0; n < o; n++) {
                var r = s[n];
                i.MinV(e.lowerBound, r, e.lowerBound), i.MaxV(e.upperBound, r, e.upperBound)
            }
            e.lowerBound.x -= this.m_particleDiameter, e.lowerBound.y -= this.m_particleDiameter, e.upperBound.x += this.m_particleDiameter, e.upperBound.y += this.m_particleDiameter
        }, b2ParticleSystem.prototype.FreeBuffer = function (t, e) {
            null !== t && (t.length = 0)
        }, b2ParticleSystem.prototype.FreeUserOverridableBuffer = function (t) {
            0 === t.userSuppliedCapacity && this.FreeBuffer(t.data, this.m_internalAllocatedCapacity)
        }, b2ParticleSystem.prototype.ReallocateBuffer3 = function (t, e, i) {
            b2Assert(i > e);
            var o = t ? t.slice() : [];
            return o.length = i, o
        }, b2ParticleSystem.prototype.ReallocateBuffer5 = function (t, e, i, o, s) {
            return b2Assert(o > i), b2Assert(!e || o <= e), s && !t || e || (t = this.ReallocateBuffer3(t, i, o)), t
        }, b2ParticleSystem.prototype.ReallocateBuffer4 = function (t, e, i, o) {
            return b2Assert(i > e), this.ReallocateBuffer5(t.data, t.userSuppliedCapacity, e, i, o)
        }, b2ParticleSystem.prototype.RequestBuffer = function (e) {
            return e || (0 === this.m_internalAllocatedCapacity && this.ReallocateInternalAllocatedBuffers(t.b2_minParticleSystemBufferCapacity), (e = []).length = this.m_internalAllocatedCapacity), e
        }, b2ParticleSystem.prototype.ReallocateHandleBuffers = function (t) {
            b2Assert(t > this.m_internalAllocatedCapacity), this.m_handleIndexBuffer.data = this.ReallocateBuffer4(this.m_handleIndexBuffer, this.m_internalAllocatedCapacity, t, !0)
        }, b2ParticleSystem.prototype.ReallocateInternalAllocatedBuffers = function (t) {
            function LimitCapacity(t, e) {
                return e && t > e ? e : t
            }
            if (t = LimitCapacity(t, this.m_def.maxCount), t = LimitCapacity(t, this.m_flagsBuffer.userSuppliedCapacity), t = LimitCapacity(t, this.m_positionBuffer.userSuppliedCapacity), t = LimitCapacity(t, this.m_velocityBuffer.userSuppliedCapacity), t = LimitCapacity(t, this.m_colorBuffer.userSuppliedCapacity), t = LimitCapacity(t, this.m_userDataBuffer.userSuppliedCapacity), this.m_internalAllocatedCapacity < t) {
                this.ReallocateHandleBuffers(t), this.m_flagsBuffer.data = this.ReallocateBuffer4(this.m_flagsBuffer, this.m_internalAllocatedCapacity, t, !1);
                var e = this.m_stuckThreshold > 0;
                this.m_lastBodyContactStepBuffer.data = this.ReallocateBuffer4(this.m_lastBodyContactStepBuffer, this.m_internalAllocatedCapacity, t, e), this.m_bodyContactCountBuffer.data = this.ReallocateBuffer4(this.m_bodyContactCountBuffer, this.m_internalAllocatedCapacity, t, e), this.m_consecutiveContactStepsBuffer.data = this.ReallocateBuffer4(this.m_consecutiveContactStepsBuffer, this.m_internalAllocatedCapacity, t, e), this.m_positionBuffer.data = this.ReallocateBuffer4(this.m_positionBuffer, this.m_internalAllocatedCapacity, t, !1), this.m_velocityBuffer.data = this.ReallocateBuffer4(this.m_velocityBuffer, this.m_internalAllocatedCapacity, t, !1), this.m_forceBuffer = this.ReallocateBuffer5(this.m_forceBuffer, 0, this.m_internalAllocatedCapacity, t, !1), this.m_weightBuffer = this.ReallocateBuffer5(this.m_weightBuffer, 0, this.m_internalAllocatedCapacity, t, !1), this.m_staticPressureBuffer = this.ReallocateBuffer5(this.m_staticPressureBuffer, 0, this.m_internalAllocatedCapacity, t, !0), this.m_accumulationBuffer = this.ReallocateBuffer5(this.m_accumulationBuffer, 0, this.m_internalAllocatedCapacity, t, !1), this.m_accumulation2Buffer = this.ReallocateBuffer5(this.m_accumulation2Buffer, 0, this.m_internalAllocatedCapacity, t, !0), this.m_depthBuffer = this.ReallocateBuffer5(this.m_depthBuffer, 0, this.m_internalAllocatedCapacity, t, !0), this.m_colorBuffer.data = this.ReallocateBuffer4(this.m_colorBuffer, this.m_internalAllocatedCapacity, t, !0), this.m_groupBuffer = this.ReallocateBuffer5(this.m_groupBuffer, 0, this.m_internalAllocatedCapacity, t, !1), this.m_userDataBuffer.data = this.ReallocateBuffer4(this.m_userDataBuffer, this.m_internalAllocatedCapacity, t, !0), this.m_expirationTimeBuffer.data = this.ReallocateBuffer4(this.m_expirationTimeBuffer, this.m_internalAllocatedCapacity, t, !0), this.m_indexByExpirationTimeBuffer.data = this.ReallocateBuffer4(this.m_indexByExpirationTimeBuffer, this.m_internalAllocatedCapacity, t, !1), this.m_internalAllocatedCapacity = t
            }
        }, b2ParticleSystem.prototype.CreateParticleForGroup = function (t, e, o) {
            var s = new ne;
            s.flags = t.flags, a.MulXV(e, o, s.position), i.AddVV(t.linearVelocity, i.CrossSV(t.angularVelocity, i.SubVV(s.position, t.position, i.s_t0), i.s_t0), s.velocity), s.color.Copy(t.color), s.lifetime = t.lifetime, s.userData = t.userData, this.CreateParticle(s)
        }, b2ParticleSystem.prototype.CreateParticlesStrokeShapeForGroup = function (t, e, o) {
            var s = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_edge,
                n = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_d,
                r = b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_p,
                a = e.stride;
            0 === a && (a = this.GetParticleStride());
            for (var l = 0, m = t.GetChildCount(), _ = 0; _ < m; _++) {
                var h = null;
                1 === t.GetType() ? h = t : (b2Assert(3 === t.GetType()), h = s, t.GetChildEdge(h, _));
                for (var u = i.SubVV(h.m_vertex2, h.m_vertex1, n), c = u.Length(); l < c;) {
                    var p = i.AddVMulSV(h.m_vertex1, l / c, u, r);
                    this.CreateParticleForGroup(e, o, p), l += a
                }
                l -= c
            }
        }, b2ParticleSystem.prototype.CreateParticlesFillShapeForGroup = function (t, e, i) {
            var o = b2ParticleSystem.CreateParticlesFillShapeForGroup_s_aabb,
                s = b2ParticleSystem.CreateParticlesFillShapeForGroup_s_p,
                n = e.stride;
            0 === n && (n = this.GetParticleStride());
            var r = a.IDENTITY,
                l = o;
            b2Assert(1 === t.GetChildCount()), t.ComputeAABB(l, r, 0);
            for (var m = Math.floor(l.lowerBound.y / n) * n; m < l.upperBound.y; m += n)
                for (var _ = Math.floor(l.lowerBound.x / n) * n; _ < l.upperBound.x; _ += n) {
                    var h = s.Set(_, m);
                    t.TestPoint(r, h) && this.CreateParticleForGroup(e, i, h)
                }
        }, b2ParticleSystem.prototype.CreateParticlesWithShapeForGroup = function (t, e, i) {
            switch (t.GetType()) {
            case 1:
            case 3:
                this.CreateParticlesStrokeShapeForGroup(t, e, i);
                break;
            case 2:
            case 0:
                this.CreateParticlesFillShapeForGroup(t, e, i);
                break;
            default:
                b2Assert(!1)
            }
        }, b2ParticleSystem.prototype.CreateParticlesWithShapesForGroup = function (t, e, i, o) {
            var s = new b2ParticleSystem.CompositeShape(t, e);
            this.CreateParticlesFillShapeForGroup(s, i, o)
        }, b2ParticleSystem.prototype.CloneParticle = function (t, e) {
            var i = new ne;
            i.flags = this.m_flagsBuffer.data[t], i.position.Copy(this.m_positionBuffer.data[t]), i.velocity.Copy(this.m_velocityBuffer.data[t]), this.m_colorBuffer.data && i.color.Copy(this.m_colorBuffer.data[t]), this.m_userDataBuffer.data && (i.userData = this.m_userDataBuffer.data[t]), i.group = e;
            var o = this.CreateParticle(i);
            if (this.m_handleIndexBuffer.data) {
                var s = this.m_handleIndexBuffer.data[t];
                s && s.SetIndex(o), this.m_handleIndexBuffer.data[o] = s, this.m_handleIndexBuffer.data[t] = null
            }
            return this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[o] = this.m_lastBodyContactStepBuffer.data[t]), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[o] = this.m_bodyContactCountBuffer.data[t]), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[o] = this.m_consecutiveContactStepsBuffer.data[t]), this.m_hasForce && this.m_forceBuffer[o].Copy(this.m_forceBuffer[t]), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[o] = this.m_staticPressureBuffer[t]), this.m_depthBuffer && (this.m_depthBuffer[o] = this.m_depthBuffer[t]), this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[o] = this.m_expirationTimeBuffer.data[t]), o
        }, b2ParticleSystem.prototype.DestroyParticlesInGroup = function (t, e) {
            void 0 === e && (e = !1);
            for (var i = t.m_firstIndex; i < t.m_lastIndex; i++) this.DestroyParticle(i, e)
        }, b2ParticleSystem.prototype.DestroyParticleGroup = function (t) {
            b2Assert(this.m_groupCount > 0), b2Assert(null !== t), this.m_world.m_destructionListener && this.m_world.m_destructionListener.SayGoodbyeParticleGroup(t), this.SetGroupFlags(t, 0);
            for (var e = t.m_firstIndex; e < t.m_lastIndex; e++) this.m_groupBuffer[e] = null;
            t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t === this.m_groupList && (this.m_groupList = t.m_next), --this.m_groupCount
        }, b2ParticleSystem.ParticleCanBeConnected = function (t, e) {
            return 0 != (28 & t) || null !== e && 0 != (2 & e.GetGroupFlags())
        }, b2ParticleSystem.prototype.UpdatePairsAndTriads = function (e, o, s) {
            var n = b2ParticleSystem.UpdatePairsAndTriads_s_dab,
                r = b2ParticleSystem.UpdatePairsAndTriads_s_dbc,
                a = b2ParticleSystem.UpdatePairsAndTriads_s_dca,
                l = this.m_positionBuffer.data;
            b2Assert(e <= o);
            for (var m = 0, _ = e; _ < o; _++) m |= this.m_flagsBuffer.data[_];
            if (m & b2ParticleSystem.k_pairFlags)
                for (var h = 0; h < this.m_contactBuffer.count; h++) {
                    var u = this.m_contactBuffer.data[h],
                        c = u.indexA,
                        p = u.indexB,
                        f = this.m_flagsBuffer.data[c],
                        d = this.m_flagsBuffer.data[p],
                        y = this.m_groupBuffer[c],
                        b = this.m_groupBuffer[p];
                    if (c >= e && c < o && p >= e && p < o && !(2 & (f | d)) && (f | d) & b2ParticleSystem.k_pairFlags && (s.IsNecessary(c) || s.IsNecessary(p)) && b2ParticleSystem.ParticleCanBeConnected(f, y) && b2ParticleSystem.ParticleCanBeConnected(d, b) && s.ShouldCreatePair(c, p)) {
                        var v = this.m_pairBuffer.data[this.m_pairBuffer.Append()];
                        v.indexA = c, v.indexB = p, v.flags = u.flags, v.strength = b2Min(y ? y.m_strength : 1, b ? b.m_strength : 1), v.distance = i.DistanceVV(l[c], l[p])
                    }
                    std_stable_sort(this.m_pairBuffer.data, 0, this.m_pairBuffer.count, b2ParticleSystem.ComparePairIndices), this.m_pairBuffer.Unique(b2ParticleSystem.MatchPairIndices)
                }
            if (m & b2ParticleSystem.k_triadFlags) {
                var S = new le(o - e);
                for (_ = e; _ < o; _++) {
                    var x = this.m_flagsBuffer.data[_],
                        C = this.m_groupBuffer[_];
                    2 & x || !b2ParticleSystem.ParticleCanBeConnected(x, C) || S.AddGenerator(l[_], _, s.IsNecessary(_))
                }
                var A = this.GetParticleStride();
                S.Generate(A / 2, 2 * A);
                var B = this;
                S.GetNodes(function (e, o, m) {
                    var _ = B.m_flagsBuffer.data[e],
                        h = B.m_flagsBuffer.data[o],
                        u = B.m_flagsBuffer.data[m];
                    if ((_ | h | u) & b2ParticleSystem.k_triadFlags && s.ShouldCreateTriad(e, o, m)) {
                        var c = l[e],
                            p = l[o],
                            f = l[m],
                            d = i.SubVV(c, p, n),
                            y = i.SubVV(p, f, r),
                            b = i.SubVV(f, c, a),
                            v = t.b2_maxTriadDistanceSquared * B.m_squaredDiameter;
                        if (i.DotVV(d, d) > v || i.DotVV(y, y) > v || i.DotVV(b, b) > v) return;
                        var S = B.m_groupBuffer[e],
                            x = B.m_groupBuffer[o],
                            C = B.m_groupBuffer[m],
                            A = B.m_triadBuffer.data[B.m_triadBuffer.Append()];
                        A.indexA = e, A.indexB = o, A.indexC = m, A.flags = _ | h | u, A.strength = b2Min(b2Min(S ? S.m_strength : 1, x ? x.m_strength : 1), C ? C.m_strength : 1);
                        var V = (c.x + p.x + f.x) / 3,
                            g = (c.y + p.y + f.y) / 3;
                        A.pa.x = c.x - V, A.pa.y = c.y - g, A.pb.x = p.x - V, A.pb.y = p.y - g, A.pc.x = f.x - V, A.pc.y = f.y - g, A.ka = -i.DotVV(b, d), A.kb = -i.DotVV(d, y), A.kc = -i.DotVV(y, b), A.s = i.CrossVV(c, p) + i.CrossVV(p, f) + i.CrossVV(f, c)
                    }
                }), std_stable_sort(this.m_triadBuffer.data, 0, this.m_triadBuffer.count, b2ParticleSystem.CompareTriadIndices), this.m_triadBuffer.Unique(b2ParticleSystem.MatchTriadIndices)
            }
        }, b2ParticleSystem.prototype.UpdatePairsAndTriadsWithReactiveParticles = function () {
            var t = new b2ParticleSystem.ReactiveFilter(this.m_flagsBuffer);
            this.UpdatePairsAndTriads(0, this.m_count, t);
            for (var e = 0; e < this.m_count; e++) this.m_flagsBuffer.data[e] &= -4097;
            this.m_allParticleFlags &= -4097
        }, b2ParticleSystem.ComparePairIndices = function (t, e) {
            var i = t.indexA - e.indexA;
            return 0 !== i ? i < 0 : t.indexB < e.indexB
        }, b2ParticleSystem.MatchPairIndices = function (t, e) {
            return t.indexA === e.indexA && t.indexB === e.indexB
        }, b2ParticleSystem.CompareTriadIndices = function (t, e) {
            var i = t.indexA - e.indexA;
            if (0 !== i) return i < 0;
            var o = t.indexB - e.indexB;
            return 0 !== o ? o < 0 : t.indexC < e.indexC
        }, b2ParticleSystem.MatchTriadIndices = function (t, e) {
            return t.indexA === e.indexA && t.indexB === e.indexB && t.indexC === e.indexC
        }, b2ParticleSystem.InitializeParticleLists = function (t, e) {
            for (var i = t.GetBufferIndex(), o = t.GetParticleCount(), s = 0; s < o; s++) {
                var n = e[s];
                n.list = n, n.next = null, n.count = 1, n.index = s + i
            }
        }, b2ParticleSystem.prototype.MergeParticleListsInContact = function (t, e) {
            for (var i = t.GetBufferIndex(), o = 0; o < this.m_contactBuffer.count; o++) {
                var s = this.m_contactBuffer.data[o],
                    n = s.indexA,
                    r = s.indexB;
                if (t.ContainsParticle(n) && t.ContainsParticle(r)) {
                    var a = e[n - i].list,
                        l = e[r - i].list;
                    if (a !== l) {
                        if (a.count < l.count) {
                            var m = a;
                            a = l, l = m
                        }
                        b2Assert(a.count >= l.count), b2ParticleSystem.MergeParticleLists(a, l)
                    }
                }
            }
        }, b2ParticleSystem.MergeParticleLists = function (t, e) {
            b2Assert(t !== e);
            for (var i = e;;) {
                i.list = t;
                var o = i.next;
                if (!o) {
                    i.next = t.next;
                    break
                }
                i = o
            }
            t.next = e, t.count += e.count, e.count = 0
        }, b2ParticleSystem.FindLongestParticleList = function (t, e) {
            for (var i = t.GetParticleCount(), o = e[0], s = 0; s < i; s++) {
                var n = e[s];
                o.count < n.count && (o = n)
            }
            return o
        }, b2ParticleSystem.prototype.MergeZombieParticleListNodes = function (t, e, i) {
            for (var o = t.GetParticleCount(), s = 0; s < o; s++) {
                var n = e[s];
                n !== i && 2 & this.m_flagsBuffer.data[n.index] && b2ParticleSystem.MergeParticleListAndNode(i, n)
            }
        }, b2ParticleSystem.MergeParticleListAndNode = function (t, e) {
            b2Assert(e !== t), b2Assert(e.list === e), b2Assert(1 === e.count), e.list = t, e.next = t.next, t.next = e, t.count++, e.count = 0
        }, b2ParticleSystem.prototype.CreateParticleGroupsFromParticleList = function (t, e, i) {
            var o = t.GetParticleCount(),
                s = new be;
            s.groupFlags = t.GetGroupFlags(), s.userData = t.GetUserData();
            for (var n = 0; n < o; n++) {
                var r = e[n];
                if (r.count && r !== i) {
                    b2Assert(r.list === r);
                    for (var a = this.CreateParticleGroup(s), l = r; l; l = l.next) {
                        var m = l.index;
                        b2Assert(!(2 & this.m_flagsBuffer.data[m]));
                        var _ = this.CloneParticle(m, a);
                        this.m_flagsBuffer.data[m] |= 2, l.index = _
                    }
                }
            }
        }, b2ParticleSystem.prototype.UpdatePairsAndTriadsWithParticleList = function (t, e) {
            for (var i = t.GetBufferIndex(), o = 0; o < this.m_pairBuffer.count; o++) {
                var s = this.m_pairBuffer.data[o],
                    n = s.indexA,
                    r = s.indexB;
                t.ContainsParticle(n) && (s.indexA = e[n - i].index), t.ContainsParticle(r) && (s.indexB = e[r - i].index)
            }
            for (o = 0; o < this.m_triadBuffer.count; o++) {
                var a = this.m_triadBuffer.data[o],
                    l = (n = a.indexA, r = a.indexB, a.indexC);
                t.ContainsParticle(n) && (a.indexA = e[n - i].index), t.ContainsParticle(r) && (a.indexB = e[r - i].index), t.ContainsParticle(l) && (a.indexC = e[l - i].index)
            }
        }, b2ParticleSystem.prototype.ComputeDepth = function () {
            for (var e = [], i = 0, o = 0; o < this.m_contactBuffer.count; o++) {
                var s = (y = this.m_contactBuffer.data[o]).indexA,
                    n = y.indexB,
                    r = this.m_groupBuffer[s],
                    a = this.m_groupBuffer[n];
                r && r === a && 16 & r.m_groupFlags && (e[i++] = y)
            }
            for (var l = [], m = 0, _ = this.m_groupList; _; _ = _.GetNext())
                if (16 & _.m_groupFlags) {
                    l[m++] = _, this.SetGroupFlags(_, -17 & _.m_groupFlags);
                    for (var h = _.m_firstIndex; h < _.m_lastIndex; h++) this.m_accumulationBuffer[h] = 0
                }
            for (o = 0; o < i; o++) {
                s = (y = e[o]).indexA, n = y.indexB;
                var u = y.weight;
                this.m_accumulationBuffer[s] += u, this.m_accumulationBuffer[n] += u
            }
            b2Assert(null !== this.m_depthBuffer);
            for (h = 0; h < m; h++)
                for (var c = (_ = l[h]).m_firstIndex; c < _.m_lastIndex; c++) {
                    u = this.m_accumulationBuffer[c];
                    this.m_depthBuffer[c] = u < .8 ? 0 : t.b2_maxFloat
                }
            for (var p = b2Sqrt(this.m_count) >> 0, f = 0; f < p; f++) {
                var d = !1;
                for (o = 0; o < i; o++) {
                    s = (y = e[o]).indexA, n = y.indexB;
                    var y, b = 1 - y.weight,
                        v = this.m_depthBuffer[s],
                        S = this.m_depthBuffer[n],
                        x = S + b,
                        C = v + b;
                    v > x && (this.m_depthBuffer[s] = x, d = !0), S > C && (this.m_depthBuffer[n] = C, d = !0)
                }
                if (!d) break
            }
            for (h = 0; h < m; h++)
                for (var A = (_ = l[h]).m_firstIndex; A < _.m_lastIndex; A++) this.m_depthBuffer[A] < t.b2_maxFloat ? this.m_depthBuffer[A] *= this.m_particleDiameter : this.m_depthBuffer[A] = 0
        }, b2ParticleSystem.prototype.GetInsideBoundsEnumerator = function (t) {
            var e = b2ParticleSystem.computeTag(this.m_inverseDiameter * t.lowerBound.x - 1, this.m_inverseDiameter * t.lowerBound.y - 1),
                i = b2ParticleSystem.computeTag(this.m_inverseDiameter * t.upperBound.x + 1, this.m_inverseDiameter * t.upperBound.y + 1),
                o = this.m_proxyBuffer.count,
                s = std_lower_bound(this.m_proxyBuffer.data, 0, o, e, b2ParticleSystem.Proxy.CompareProxyTag),
                n = std_upper_bound(this.m_proxyBuffer.data, 0, o, i, b2ParticleSystem.Proxy.CompareTagProxy);
            return b2Assert(0 <= s), b2Assert(s <= n), b2Assert(n <= o), new b2ParticleSystem.InsideBoundsEnumerator(this, e, i, s, n)
        }, b2ParticleSystem.prototype.UpdateAllParticleFlags = function () {
            this.m_allParticleFlags = 0;
            for (var t = 0; t < this.m_count; t++) this.m_allParticleFlags |= this.m_flagsBuffer.data[t];
            this.m_needsUpdateAllParticleFlags = !1
        }, b2ParticleSystem.prototype.UpdateAllGroupFlags = function () {
            this.m_allGroupFlags = 0;
            for (var t = this.m_groupList; t; t = t.GetNext()) this.m_allGroupFlags |= t.m_groupFlags;
            this.m_needsUpdateAllGroupFlags = !1
        }, b2ParticleSystem.prototype.AddContact = function (t, e, o) {
            var s = b2ParticleSystem.AddContact_s_d,
                n = this.m_positionBuffer.data;
            b2Assert(o === this.m_contactBuffer);
            var r = i.SubVV(n[e], n[t], s),
                a = i.DotVV(r, r);
            if (a < this.m_squaredDiameter) {
                var l = b2InvSqrt(a);
                isFinite(l) || (l = 198177537e11);
                var m = this.m_contactBuffer.data[this.m_contactBuffer.Append()];
                m.indexA = t, m.indexB = e, m.flags = this.m_flagsBuffer.data[t] | this.m_flagsBuffer.data[e], m.weight = 1 - a * l * this.m_inverseDiameter, i.MulSV(l, r, m.normal)
            }
        }, b2ParticleSystem.prototype.FindContacts_Reference = function (t) {
            b2Assert(t === this.m_contactBuffer);
            var e = this.m_proxyBuffer.count;
            this.m_contactBuffer.count = 0;
            for (var i = 0, o = 0; i < e; i++) {
                for (var s = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[i].tag, 1, 0), n = i + 1; n < e && !(s < this.m_proxyBuffer.data[n].tag); n++) this.AddContact(this.m_proxyBuffer.data[i].index, this.m_proxyBuffer.data[n].index, this.m_contactBuffer);
                for (var r = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[i].tag, -1, 1); o < e && !(r <= this.m_proxyBuffer.data[o].tag); o++);
                var a = b2ParticleSystem.computeRelativeTag(this.m_proxyBuffer.data[i].tag, 1, 1);
                for (n = o; n < e && !(a < this.m_proxyBuffer.data[n].tag); n++) this.AddContact(this.m_proxyBuffer.data[i].index, this.m_proxyBuffer.data[n].index, this.m_contactBuffer)
            }
        }, b2ParticleSystem.prototype.FindContacts = function (t) {
            this.FindContacts_Reference(t)
        }, b2ParticleSystem.prototype.UpdateProxies_Reference = function (t) {
            b2Assert(t === this.m_proxyBuffer);
            for (var e = this.m_positionBuffer.data, i = this.m_inverseDiameter, o = 0; o < this.m_proxyBuffer.count; ++o) {
                var s = this.m_proxyBuffer.data[o],
                    n = e[s.index];
                s.tag = b2ParticleSystem.computeTag(i * n.x, i * n.y)
            }
        }, b2ParticleSystem.prototype.UpdateProxies = function (t) {
            this.UpdateProxies_Reference(t)
        }, b2ParticleSystem.prototype.SortProxies = function (t) {
            b2Assert(t === this.m_proxyBuffer), std_sort(this.m_proxyBuffer.data, 0, this.m_proxyBuffer.count, b2ParticleSystem.Proxy.CompareProxyProxy)
        }, b2ParticleSystem.prototype.FilterContacts = function (t) {
            var e = this.GetParticleContactFilter();
            if (null !== e) {
                b2Assert(t === this.m_contactBuffer);
                var i = this;
                this.m_contactBuffer.RemoveIf(function (t) {
                    return 131072 & t.flags && !e.ShouldCollideParticleParticle(i, t.indexA, t.indexB)
                })
            }
        }, b2ParticleSystem.prototype.NotifyContactListenerPreContact = function (t) {
            if (null !== this.GetParticleContactListener()) throw t.Initialize(this.m_contactBuffer, this.m_flagsBuffer), new Error
        }, b2ParticleSystem.prototype.NotifyContactListenerPostContact = function (t) {
            var e = this.GetParticleContactListener();
            if (null !== e) {
                for (var i = 0; i < this.m_contactBuffer.count; ++i) {
                    var o = this.m_contactBuffer.data[i];
                    e.BeginContactParticleParticle(this, o)
                }
                throw new Error
            }
        }, b2ParticleSystem.b2ParticleContactIsZombie = function (t) {
            return 2 == (2 & t.flags)
        }, b2ParticleSystem.prototype.UpdateContacts = function (t) {
            this.UpdateProxies(this.m_proxyBuffer), this.SortProxies(this.m_proxyBuffer);
            var e = new b2ParticleSystem.b2ParticlePairSet;
            this.NotifyContactListenerPreContact(e), this.FindContacts(this.m_contactBuffer), this.FilterContacts(this.m_contactBuffer), this.NotifyContactListenerPostContact(e), t && this.m_contactBuffer.RemoveIf(b2ParticleSystem.b2ParticleContactIsZombie)
        }, b2ParticleSystem.prototype.NotifyBodyContactListenerPreContact = function (t) {
            if (null !== this.GetFixtureContactListener()) throw t.Initialize(this.m_bodyContactBuffer, this.m_flagsBuffer), new Error
        }, b2ParticleSystem.prototype.NotifyBodyContactListenerPostContact = function (t) {
            var e = this.GetFixtureContactListener();
            if (null !== e) {
                for (var i = 0; i < this.m_bodyContactBuffer.count; i++) {
                    var o = this.m_bodyContactBuffer.data[i];
                    b2Assert(null !== o);
                    e.BeginContactFixtureParticle(this, o)
                }
                throw new Error
            }
        }, b2ParticleSystem.prototype.UpdateBodyContacts = function () {
            var t = b2ParticleSystem.UpdateBodyContacts_s_aabb,
                e = new b2ParticleSystem.FixtureParticleSet;
            if (this.NotifyBodyContactListenerPreContact(e), this.m_stuckThreshold > 0)
                for (var i = this.GetParticleCount(), o = 0; o < i; o++) this.m_bodyContactCountBuffer.data[o] = 0, this.m_timestamp > this.m_lastBodyContactStepBuffer.data[o] + 1 && (this.m_consecutiveContactStepsBuffer.data[o] = 0);
            this.m_bodyContactBuffer.SetCount(0), this.m_stuckParticleBuffer.SetCount(0);
            var s = t;
            this.ComputeAABB(s);
            var n = new b2ParticleSystem.UpdateBodyContactsCallback(this, this.GetFixtureContactFilter());
            this.m_world.QueryAABB(n, s), this.m_def.strictContactCheck && this.RemoveSpuriousBodyContacts(), this.NotifyBodyContactListenerPostContact(e)
        }, b2ParticleSystem.prototype.Solve = function (t) {
            var e = b2ParticleSystem.Solve_s_subStep;
            if (0 !== this.m_count && (this.m_expirationTimeBuffer.data && this.SolveLifetimes(t), 2 & this.m_allParticleFlags && this.SolveZombie(), this.m_needsUpdateAllParticleFlags && this.UpdateAllParticleFlags(), this.m_needsUpdateAllGroupFlags && this.UpdateAllGroupFlags(), !this.m_paused))
                for (this.m_iterationIndex = 0; this.m_iterationIndex < t.particleIterations; this.m_iterationIndex++) {
                    ++this.m_timestamp;
                    var i = e.Copy(t);
                    i.dt /= t.particleIterations, i.inv_dt *= t.particleIterations, this.UpdateContacts(!1), this.UpdateBodyContacts(), this.ComputeWeight(), 16 & this.m_allGroupFlags && this.ComputeDepth(), 4096 & this.m_allParticleFlags && this.UpdatePairsAndTriadsWithReactiveParticles(), this.m_hasForce && this.SolveForce(i), 32 & this.m_allParticleFlags && this.SolveViscous(), 8192 & this.m_allParticleFlags && this.SolveRepulsive(i), 64 & this.m_allParticleFlags && this.SolvePowder(i), 128 & this.m_allParticleFlags && this.SolveTensile(i), 1 & this.m_allGroupFlags && this.SolveSolid(i), 256 & this.m_allParticleFlags && this.SolveColorMixing(), this.SolveGravity(i), 2048 & this.m_allParticleFlags && this.SolveStaticPressure(i), this.SolvePressure(i), this.SolveDamping(i), this.m_allParticleFlags & b2ParticleSystem.k_extraDampingFlags && this.SolveExtraDamping(), 16 & this.m_allParticleFlags && this.SolveElastic(i), 8 & this.m_allParticleFlags && this.SolveSpring(i), this.LimitVelocity(i), 2 & this.m_allGroupFlags && this.SolveRigidDamping(), 1024 & this.m_allParticleFlags && this.SolveBarrier(i), this.SolveCollision(i), 2 & this.m_allGroupFlags && this.SolveRigid(i), 4 & this.m_allParticleFlags && this.SolveWall();
                    for (var o = 0; o < this.m_count; o++) this.m_positionBuffer.data[o].SelfMulAdd(i.dt, this.m_velocityBuffer.data[o])
                }
        }, b2ParticleSystem.prototype.SolveCollision = function (e) {
            var i = b2ParticleSystem.SolveCollision_s_aabb,
                o = this.m_positionBuffer.data,
                s = this.m_velocityBuffer.data,
                n = i;
            n.lowerBound.x = +t.b2_maxFloat, n.lowerBound.y = +t.b2_maxFloat, n.upperBound.x = -t.b2_maxFloat, n.upperBound.y = -t.b2_maxFloat;
            for (var r = 0; r < this.m_count; r++) {
                var a = s[r],
                    l = o[r],
                    m = l.x + e.dt * a.x,
                    _ = l.y + e.dt * a.y;
                n.lowerBound.x = b2Min(n.lowerBound.x, b2Min(l.x, m)), n.lowerBound.y = b2Min(n.lowerBound.y, b2Min(l.y, _)), n.upperBound.x = b2Max(n.upperBound.x, b2Max(l.x, m)), n.upperBound.y = b2Max(n.upperBound.y, b2Max(l.y, _))
            }
            var h = new b2ParticleSystem.SolveCollisionCallback(this, e);
            this.m_world.QueryAABB(h, n)
        }, b2ParticleSystem.prototype.LimitVelocity = function (t) {
            for (var e = this.m_velocityBuffer.data, o = this.GetCriticalVelocitySquared(t), s = 0; s < this.m_count; s++) {
                var n = e[s],
                    r = i.DotVV(n, n);
                r > o && n.SelfMul(b2Sqrt(o / r))
            }
        }, b2ParticleSystem.prototype.SolveGravity = function (t) {
            for (var e = b2ParticleSystem.SolveGravity_s_gravity, o = this.m_velocityBuffer.data, s = i.MulSV(t.dt * this.m_def.gravityScale, this.m_world.GetGravity(), e), n = 0; n < this.m_count; n++) o[n].SelfAdd(s)
        }, b2ParticleSystem.prototype.SolveBarrier = function (e) {
            for (var o = b2ParticleSystem.SolveBarrier_s_aabb, s = b2ParticleSystem.SolveBarrier_s_va, n = b2ParticleSystem.SolveBarrier_s_vb, r = b2ParticleSystem.SolveBarrier_s_pba, a = b2ParticleSystem.SolveBarrier_s_vba, l = b2ParticleSystem.SolveBarrier_s_vc, m = b2ParticleSystem.SolveBarrier_s_pca, _ = b2ParticleSystem.SolveBarrier_s_vca, h = b2ParticleSystem.SolveBarrier_s_qba, u = b2ParticleSystem.SolveBarrier_s_qca, c = b2ParticleSystem.SolveBarrier_s_dv, p = b2ParticleSystem.SolveBarrier_s_f, f = this.m_positionBuffer.data, d = this.m_velocityBuffer.data, y = 0; y < this.m_count; y++) {
                0 != (this.m_flagsBuffer.data[y] & b2ParticleSystem.k_barrierWallFlags) && d[y].SetZero()
            }
            for (var b = t.b2_barrierCollisionTime * e.dt, v = this.GetParticleMass(), S = 0; S < this.m_pairBuffer.count; S++) {
                var x = this.m_pairBuffer.data[S];
                if (1024 & x.flags) {
                    var C = x.indexA,
                        A = x.indexB,
                        B = f[C],
                        V = f[A],
                        g = o;
                    i.MinV(B, V, g.lowerBound), i.MaxV(B, V, g.upperBound);
                    for (var P = this.m_groupBuffer[C], w = this.m_groupBuffer[A], M = this.GetLinearVelocity(P, C, B, s), I = this.GetLinearVelocity(w, A, V, n), D = i.SubVV(V, B, r), G = i.SubVV(I, M, a), F = this.GetInsideBoundsEnumerator(g), R = void 0;
                        (R = F.GetNext()) >= 0;) {
                        var J = f[R],
                            T = this.m_groupBuffer[R];
                        if (P !== T && w !== T) {
                            var L = this.GetLinearVelocity(T, R, J, l),
                                k = i.SubVV(J, B, m),
                                q = i.SubVV(L, M, _),
                                z = i.CrossVV(G, q),
                                W = i.CrossVV(D, q) - i.CrossVV(k, G),
                                E = i.CrossVV(D, k),
                                j = void 0,
                                N = void 0,
                                O = h,
                                X = u;
                            if (0 === z) {
                                if (0 === W) continue;
                                if (!((N = -E / W) >= 0 && N < b)) continue;
                                if (i.AddVMulSV(D, N, G, O), i.AddVMulSV(k, N, q, X), !((j = i.DotVV(O, X) / i.DotVV(O, O)) >= 0 && j <= 1)) continue
                            } else {
                                var U = W * W - 4 * E * z;
                                if (U < 0) continue;
                                var Z = b2Sqrt(U),
                                    H = (-W - Z) / (2 * z),
                                    Q = (-W + Z) / (2 * z);
                                if (H > Q) {
                                    var Y = H;
                                    H = Q, Q = Y
                                }
                                if (N = H, i.AddVMulSV(D, N, G, O), i.AddVMulSV(k, N, q, X), j = i.DotVV(O, X) / i.DotVV(O, O), !(N >= 0 && N < b && j >= 0 && j <= 1)) {
                                    if (!((N = Q) >= 0 && N < b)) continue;
                                    if (i.AddVMulSV(D, N, G, O), i.AddVMulSV(k, N, q, X), !((j = i.DotVV(O, X) / i.DotVV(O, O)) >= 0 && j <= 1)) continue
                                }
                            }
                            var K = c;
                            K.x = M.x + j * G.x - L.x, K.y = M.y + j * G.y - L.y;
                            var $ = i.MulSV(v, K, p);
                            if (this.IsRigidGroup(T)) {
                                var tt = T.GetMass(),
                                    et = T.GetInertia();
                                tt > 0 && T.m_linearVelocity.SelfMulAdd(1 / tt, $), et > 0 && (T.m_angularVelocity += i.CrossVV(i.SubVV(J, T.GetCenter(), i.s_t0), $) / et)
                            } else d[R].SelfAdd(K);
                            this.ParticleApplyForce(R, $.SelfMul(-e.inv_dt))
                        }
                    }
                }
            }
        }, b2ParticleSystem.prototype.SolveStaticPressure = function (e) {
            this.m_staticPressureBuffer = this.RequestBuffer(this.m_staticPressureBuffer);
            for (var i = this.GetCriticalPressure(e), o = this.m_def.staticPressureStrength * i, s = t.b2_maxParticlePressure * i, n = this.m_def.staticPressureRelaxation, r = 0; r < this.m_def.staticPressureIterations; r++) {
                for (var a = 0; a < this.m_count; a++) this.m_accumulationBuffer[a] = 0;
                for (var l = 0; l < this.m_contactBuffer.count; l++) {
                    var m = this.m_contactBuffer.data[l];
                    if (2048 & m.flags) {
                        var _ = m.indexA,
                            h = m.indexB,
                            u = m.weight;
                        this.m_accumulationBuffer[_] += u * this.m_staticPressureBuffer[h], this.m_accumulationBuffer[h] += u * this.m_staticPressureBuffer[_]
                    }
                }
                for (a = 0; a < this.m_count; a++) {
                    u = this.m_weightBuffer[a];
                    if (2048 & this.m_flagsBuffer.data[a]) {
                        var c = (this.m_accumulationBuffer[a] + o * (u - t.b2_minParticleWeight)) / (u + n);
                        this.m_staticPressureBuffer[a] = b2Clamp(c, 0, s)
                    } else this.m_staticPressureBuffer[a] = 0
                }
            }
        }, b2ParticleSystem.prototype.ComputeWeight = function () {
            for (var t = 0; t < this.m_count; t++) this.m_weightBuffer[t] = 0;
            for (t = 0; t < this.m_bodyContactBuffer.count; t++) {
                var e = (o = this.m_bodyContactBuffer.data[t]).index,
                    i = o.weight;
                this.m_weightBuffer[e] += i
            }
            for (t = 0; t < this.m_contactBuffer.count; t++) {
                e = (o = this.m_contactBuffer.data[t]).indexA;
                var o, s = o.indexB;
                i = o.weight;
                this.m_weightBuffer[e] += i, this.m_weightBuffer[s] += i
            }
        }, b2ParticleSystem.prototype.SolvePressure = function (e) {
            for (var o = b2ParticleSystem.SolvePressure_s_f, s = this.m_positionBuffer.data, n = this.m_velocityBuffer.data, r = this.GetCriticalPressure(e), a = this.m_def.pressureStrength * r, l = t.b2_maxParticlePressure * r, m = 0; m < this.m_count; m++) {
                var _ = a * b2Max(0, (d = this.m_weightBuffer[m]) - t.b2_minParticleWeight);
                this.m_accumulationBuffer[m] = b2Min(_, l)
            }
            if (this.m_allParticleFlags & b2ParticleSystem.k_noPressureFlags)
                for (m = 0; m < this.m_count; m++) this.m_flagsBuffer.data[m] & b2ParticleSystem.k_noPressureFlags && (this.m_accumulationBuffer[m] = 0);
            if (2048 & this.m_allParticleFlags) {
                b2Assert(null !== this.m_staticPressureBuffer);
                for (m = 0; m < this.m_count; m++) 2048 & this.m_flagsBuffer.data[m] && (this.m_accumulationBuffer[m] += this.m_staticPressureBuffer[m])
            }
            for (var h = e.dt / (this.m_def.density * this.m_particleDiameter), u = this.GetParticleInvMass(), c = 0; c < this.m_bodyContactBuffer.count; c++) {
                var p = (x = this.m_bodyContactBuffer.data[c]).index,
                    f = x.body,
                    d = x.weight,
                    y = x.mass,
                    b = x.normal,
                    v = s[p],
                    S = (_ = this.m_accumulationBuffer[p] + a * d, i.MulSV(h * d * y * _, b, o));
                n[p].SelfMulSub(u, S), f.ApplyLinearImpulse(S, v, !0)
            }
            for (c = 0; c < this.m_contactBuffer.count; c++) {
                var x;
                p = (x = this.m_contactBuffer.data[c]).indexA, f = x.indexB, d = x.weight, b = x.normal, _ = this.m_accumulationBuffer[p] + this.m_accumulationBuffer[f], S = i.MulSV(h * d * _, b, o);
                n[p].SelfSub(S), n[f].SelfAdd(S)
            }
        }, b2ParticleSystem.prototype.SolveDamping = function (t) {
            for (var e = b2ParticleSystem.SolveDamping_s_v, o = b2ParticleSystem.SolveDamping_s_f, s = this.m_positionBuffer.data, n = this.m_velocityBuffer.data, r = this.m_def.dampingStrength, a = 1 / this.GetCriticalVelocity(t), l = this.GetParticleInvMass(), m = 0; m < this.m_bodyContactBuffer.count; m++) {
                var _ = (v = this.m_bodyContactBuffer.data[m]).index,
                    h = v.body,
                    u = v.weight,
                    c = v.mass,
                    p = v.normal,
                    f = s[_],
                    d = i.SubVV(h.GetLinearVelocityFromWorldPoint(f, i.s_t0), n[_], e);
                if ((S = i.DotVV(d, p)) < 0) {
                    var y = b2Max(r * u, b2Min(-a * S, .5)),
                        b = i.MulSV(y * c * S, p, o);
                    n[_].SelfMulAdd(l, b), h.ApplyLinearImpulse(b.SelfNeg(), f, !0)
                }
            }
            for (m = 0; m < this.m_contactBuffer.count; m++) {
                var v, S;
                _ = (v = this.m_contactBuffer.data[m]).indexA, h = v.indexB, u = v.weight, p = v.normal, d = i.SubVV(n[h], n[_], e);
                if ((S = i.DotVV(d, p)) < 0) {
                    y = b2Max(r * u, b2Min(-a * S, .5)), b = i.MulSV(y * S, p, o);
                    n[_].SelfAdd(b), n[h].SelfSub(b)
                }
            }
        }, b2ParticleSystem.prototype.SolveRigidDamping = function () {
            for (var t = b2ParticleSystem.SolveRigidDamping_s_t0, e = b2ParticleSystem.SolveRigidDamping_s_t1, o = b2ParticleSystem.SolveRigidDamping_s_p, s = b2ParticleSystem.SolveRigidDamping_s_v, n = [0], r = [0], a = [0], l = [0], m = [0], _ = [0], h = this.m_positionBuffer.data, u = this.m_def.dampingStrength, c = 0; c < this.m_bodyContactBuffer.count; c++) {
                var p = (C = this.m_bodyContactBuffer.data[c]).index,
                    f = this.m_groupBuffer[p];
                if (this.IsRigidGroup(f)) {
                    var d = C.body,
                        y = C.normal,
                        b = C.weight,
                        v = h[p],
                        S = i.SubVV(d.GetLinearVelocityFromWorldPoint(v, t), f.GetLinearVelocityFromWorldPoint(v, e), s);
                    if ((g = i.DotVV(S, y)) < 0) {
                        this.InitDampingParameterWithRigidGroupOrParticle(n, r, a, !0, f, p, v, y), this.InitDampingParameter(l, m, _, d.GetMass(), d.GetInertia() - d.GetMass() * d.GetLocalCenter().LengthSquared(), d.GetWorldCenter(), v, y);
                        var x = u * b2Min(b, 1) * this.ComputeDampingImpulse(n[0], r[0], a[0], l[0], m[0], _[0], g);
                        this.ApplyDamping(n[0], r[0], a[0], !0, f, p, x, y), d.ApplyLinearImpulse(i.MulSV(-x, y, i.s_t0), v, !0)
                    }
                }
            }
            for (c = 0; c < this.m_contactBuffer.count; c++) {
                p = (C = this.m_contactBuffer.data[c]).indexA, d = C.indexB, y = C.normal, b = C.weight, f = this.m_groupBuffer[p];
                var C, A = this.m_groupBuffer[d],
                    B = this.IsRigidGroup(f),
                    V = this.IsRigidGroup(A);
                if (f !== A && (B || V)) {
                    var g;
                    v = i.MidVV(h[p], h[d], o), S = i.SubVV(this.GetLinearVelocity(A, d, v, t), this.GetLinearVelocity(f, p, v, e), s);
                    if ((g = i.DotVV(S, y)) < 0) {
                        this.InitDampingParameterWithRigidGroupOrParticle(n, r, a, B, f, p, v, y), this.InitDampingParameterWithRigidGroupOrParticle(l, m, _, V, A, d, v, y);
                        x = u * b * this.ComputeDampingImpulse(n[0], r[0], a[0], l[0], m[0], _[0], g);
                        this.ApplyDamping(n[0], r[0], a[0], B, f, p, x, y), this.ApplyDamping(l[0], m[0], _[0], V, A, d, -x, y)
                    }
                }
            }
        }, b2ParticleSystem.prototype.SolveExtraDamping = function () {
            for (var t = b2ParticleSystem.SolveExtraDamping_s_v, e = b2ParticleSystem.SolveExtraDamping_s_f, o = this.m_velocityBuffer.data, s = this.m_positionBuffer.data, n = this.GetParticleInvMass(), r = 0; r < this.m_bodyContactBuffer.count; r++) {
                var a = this.m_bodyContactBuffer.data[r],
                    l = a.index;
                if (this.m_flagsBuffer.data[l] & b2ParticleSystem.k_extraDampingFlags) {
                    var m = a.body,
                        _ = a.mass,
                        h = a.normal,
                        u = s[l],
                        c = i.SubVV(m.GetLinearVelocityFromWorldPoint(u, i.s_t0), o[l], t),
                        p = i.DotVV(c, h);
                    if (p < 0) {
                        var f = i.MulSV(.5 * _ * p, h, e);
                        o[l].SelfMulAdd(n, f), m.ApplyLinearImpulse(f.SelfNeg(), u, !0)
                    }
                }
            }
        }, b2ParticleSystem.prototype.SolveWall = function () {
            for (var t = this.m_velocityBuffer.data, e = 0; e < this.m_count; e++) 4 & this.m_flagsBuffer.data[e] && t[e].SetZero()
        }, b2ParticleSystem.prototype.SolveRigid = function (t) {
            for (var e = b2ParticleSystem.SolveRigid_s_position, o = b2ParticleSystem.SolveRigid_s_rotation, s = b2ParticleSystem.SolveRigid_s_transform, n = b2ParticleSystem.SolveRigid_s_velocityTransform, l = this.m_positionBuffer.data, m = this.m_velocityBuffer.data, _ = this.m_groupList; _; _ = _.GetNext())
                if (2 & _.m_groupFlags) {
                    _.UpdateStatistics();
                    var h = o;
                    h.SetAngle(t.dt * _.m_angularVelocity);
                    var u = i.AddVV(_.m_center, i.SubVV(i.MulSV(t.dt, _.m_linearVelocity, i.s_t0), r.MulRV(h, _.m_center, i.s_t1), i.s_t0), e),
                        c = s;
                    c.SetPositionRotation(u, h), a.MulXX(c, _.m_transform, _.m_transform);
                    var p = n;
                    p.p.x = t.inv_dt * c.p.x, p.p.y = t.inv_dt * c.p.y, p.q.s = t.inv_dt * c.q.s, p.q.c = t.inv_dt * (c.q.c - 1);
                    for (var f = _.m_firstIndex; f < _.m_lastIndex; f++) a.MulXV(p, l[f], m[f])
                }
        }, b2ParticleSystem.prototype.SolveElastic = function (t) {
            for (var e = b2ParticleSystem.SolveElastic_s_pa, o = b2ParticleSystem.SolveElastic_s_pb, s = b2ParticleSystem.SolveElastic_s_pc, n = b2ParticleSystem.SolveElastic_s_r, a = b2ParticleSystem.SolveElastic_s_t0, l = this.m_positionBuffer.data, m = this.m_velocityBuffer.data, _ = t.inv_dt * this.m_def.elasticStrength, h = 0; h < this.m_triadBuffer.count; h++) {
                var u = this.m_triadBuffer.data[h];
                if (16 & u.flags) {
                    var c = u.indexA,
                        p = u.indexB,
                        f = u.indexC,
                        d = u.pa,
                        y = u.pb,
                        b = u.pc,
                        v = e.Copy(l[c]),
                        S = o.Copy(l[p]),
                        x = s.Copy(l[f]),
                        C = m[c],
                        A = m[p],
                        B = m[f];
                    v.SelfMulAdd(t.dt, C), S.SelfMulAdd(t.dt, A), x.SelfMulAdd(t.dt, B);
                    var V = (v.x + S.x + x.x) / 3,
                        g = (v.y + S.y + x.y) / 3;
                    v.x -= V, v.y -= g, S.x -= V, S.y -= g, x.x -= V, x.y -= g;
                    var P = n;
                    P.s = i.CrossVV(d, v) + i.CrossVV(y, S) + i.CrossVV(b, x), P.c = i.DotVV(d, v) + i.DotVV(y, S) + i.DotVV(b, x);
                    var w = b2InvSqrt(P.s * P.s + P.c * P.c);
                    isFinite(w) || (w = 198177537e11), P.s *= w, P.c *= w;
                    var M = _ * u.strength;
                    r.MulRV(P, d, a), i.SubVV(a, v, a), i.MulSV(M, a, a), C.SelfAdd(a), r.MulRV(P, y, a), i.SubVV(a, S, a), i.MulSV(M, a, a), A.SelfAdd(a), r.MulRV(P, b, a), i.SubVV(a, x, a), i.MulSV(M, a, a), B.SelfAdd(a)
                }
            }
        }, b2ParticleSystem.prototype.SolveSpring = function (t) {
            for (var e = b2ParticleSystem.SolveSpring_s_pa, o = b2ParticleSystem.SolveSpring_s_pb, s = b2ParticleSystem.SolveSpring_s_d, n = b2ParticleSystem.SolveSpring_s_f, r = this.m_positionBuffer.data, a = this.m_velocityBuffer.data, l = t.inv_dt * this.m_def.springStrength, m = 0; m < this.m_pairBuffer.count; m++) {
                var _ = this.m_pairBuffer.data[m];
                if (8 & _.flags) {
                    var h = _.indexA,
                        u = _.indexB,
                        c = e.Copy(r[h]),
                        p = o.Copy(r[u]),
                        f = a[h],
                        d = a[u];
                    c.SelfMulAdd(t.dt, f), p.SelfMulAdd(t.dt, d);
                    var y = i.SubVV(p, c, s),
                        b = _.distance,
                        v = y.Length(),
                        S = l * _.strength,
                        x = i.MulSV(S * (b - v) / v, y, n);
                    f.SelfSub(x), d.SelfAdd(x)
                }
            }
        }, b2ParticleSystem.prototype.SolveTensile = function (e) {
            var o = b2ParticleSystem.SolveTensile_s_weightedNormal,
                s = b2ParticleSystem.SolveTensile_s_s,
                n = b2ParticleSystem.SolveTensile_s_f,
                r = this.m_velocityBuffer.data;
            b2Assert(null !== this.m_accumulation2Buffer);
            for (var a = 0; a < this.m_count; a++) this.m_accumulation2Buffer[a] = new i, this.m_accumulation2Buffer[a].SetZero();
            for (var l = 0; l < this.m_contactBuffer.count; l++) {
                if (128 & (b = this.m_contactBuffer.data[l]).flags) {
                    var m = b.indexA,
                        _ = b.indexB,
                        h = b.weight,
                        u = b.normal,
                        c = i.MulSV((1 - h) * h, u, o);
                    this.m_accumulation2Buffer[m].SelfSub(c), this.m_accumulation2Buffer[_].SelfAdd(c)
                }
            }
            var p = this.GetCriticalVelocity(e),
                f = this.m_def.surfaceTensionPressureStrength * p,
                d = this.m_def.surfaceTensionNormalStrength * p,
                y = t.b2_maxParticleForce * p;
            for (l = 0; l < this.m_contactBuffer.count; l++) {
                var b;
                if (128 & (b = this.m_contactBuffer.data[l]).flags) {
                    m = b.indexA, _ = b.indexB, h = b.weight, u = b.normal;
                    var v = this.m_weightBuffer[m] + this.m_weightBuffer[_],
                        S = i.SubVV(this.m_accumulation2Buffer[_], this.m_accumulation2Buffer[m], s),
                        x = b2Min(f * (v - 2) + d * i.DotVV(S, u), y) * h,
                        C = i.MulSV(x, u, n);
                    r[m].SelfSub(C), r[_].SelfAdd(C)
                }
            }
        }, b2ParticleSystem.prototype.SolveViscous = function () {
            for (var t = b2ParticleSystem.SolveViscous_s_v, e = b2ParticleSystem.SolveViscous_s_f, o = this.m_positionBuffer.data, s = this.m_velocityBuffer.data, n = this.m_def.viscousStrength, r = this.GetParticleInvMass(), a = 0; a < this.m_bodyContactBuffer.count; a++) {
                var l = (f = this.m_bodyContactBuffer.data[a]).index;
                if (32 & this.m_flagsBuffer.data[l]) {
                    var m = f.body,
                        _ = f.weight,
                        h = f.mass,
                        u = o[l],
                        c = i.SubVV(m.GetLinearVelocityFromWorldPoint(u, i.s_t0), s[l], t),
                        p = i.MulSV(n * h * _, c, e);
                    s[l].SelfMulAdd(r, p), m.ApplyLinearImpulse(p.SelfNeg(), u, !0)
                }
            }
            for (a = 0; a < this.m_contactBuffer.count; a++) {
                var f;
                if (32 & (f = this.m_contactBuffer.data[a]).flags) {
                    l = f.indexA, m = f.indexB, _ = f.weight, c = i.SubVV(s[m], s[l], t), p = i.MulSV(n * _, c, e);
                    s[l].SelfAdd(p), s[m].SelfSub(p)
                }
            }
        }, b2ParticleSystem.prototype.SolveRepulsive = function (t) {
            for (var e = b2ParticleSystem.SolveRepulsive_s_f, o = this.m_velocityBuffer.data, s = this.m_def.repulsiveStrength * this.GetCriticalVelocity(t), n = 0; n < this.m_contactBuffer.count; n++) {
                var r = this.m_contactBuffer.data[n];
                if (8192 & r.flags) {
                    var a = r.indexA,
                        l = r.indexB;
                    if (this.m_groupBuffer[a] !== this.m_groupBuffer[l]) {
                        var m = r.weight,
                            _ = r.normal,
                            h = i.MulSV(s * m, _, e);
                        o[a].SelfSub(h), o[l].SelfAdd(h)
                    }
                }
            }
        }, b2ParticleSystem.prototype.SolvePowder = function (e) {
            for (var o = b2ParticleSystem.SolvePowder_s_f, s = this.m_positionBuffer.data, n = this.m_velocityBuffer.data, r = this.m_def.powderStrength * this.GetCriticalVelocity(e), a = 1 - t.b2_particleStride, l = this.GetParticleInvMass(), m = 0; m < this.m_bodyContactBuffer.count; m++) {
                var _ = (d = this.m_bodyContactBuffer.data[m]).index;
                if (64 & this.m_flagsBuffer.data[_])
                    if ((y = d.weight) > a) {
                        var h = d.body,
                            u = d.mass,
                            c = s[_],
                            p = d.normal,
                            f = i.MulSV(r * u * (y - a), p, o);
                        n[_].SelfMulSub(l, f), h.ApplyLinearImpulse(f, c, !0)
                    }
            }
            for (m = 0; m < this.m_contactBuffer.count; m++) {
                var d, y;
                if (64 & (d = this.m_contactBuffer.data[m]).flags)
                    if ((y = d.weight) > a) {
                        _ = d.indexA, h = d.indexB, p = d.normal, f = i.MulSV(r * (y - a), p, o);
                        n[_].SelfSub(f), n[h].SelfAdd(f)
                    }
            }
        }, b2ParticleSystem.prototype.SolveSolid = function (t) {
            var e = b2ParticleSystem.SolveSolid_s_f,
                o = this.m_velocityBuffer.data;
            this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer);
            for (var s = t.inv_dt * this.m_def.ejectionStrength, n = 0; n < this.m_contactBuffer.count; n++) {
                var r = this.m_contactBuffer.data[n],
                    a = r.indexA,
                    l = r.indexB;
                if (this.m_groupBuffer[a] !== this.m_groupBuffer[l]) {
                    var m = r.weight,
                        _ = r.normal,
                        h = this.m_depthBuffer[a] + this.m_depthBuffer[l],
                        u = i.MulSV(s * h * m, _, e);
                    o[a].SelfSub(u), o[l].SelfAdd(u)
                }
            }
        }, b2ParticleSystem.prototype.SolveForce = function (t) {
            for (var e = this.m_velocityBuffer.data, i = t.dt * this.GetParticleInvMass(), o = 0; o < this.m_count; o++) e[o].SelfMulAdd(i, this.m_forceBuffer[o]);
            this.m_hasForce = !1
        }, b2ParticleSystem.prototype.SolveColorMixing = function () {
            b2Assert(null !== this.m_colorBuffer.data);
            var t = .5 * this.m_def.colorMixingStrength;
            if (t)
                for (var e = 0; e < this.m_contactBuffer.count; e++) {
                    var i = this.m_contactBuffer.data[e],
                        o = i.indexA,
                        s = i.indexB;
                    if (this.m_flagsBuffer.data[o] & this.m_flagsBuffer.data[s] & 256) {
                        var n = this.m_colorBuffer.data[o],
                            r = this.m_colorBuffer.data[s];
                        m.MixColors(n, r, t)
                    }
                }
        }, b2ParticleSystem.prototype.SolveZombie = function () {
            for (var e = 0, i = [], o = 0; o < this.m_count; o++) i[o] = t.b2_invalidParticleIndex;
            b2Assert(i.length === this.m_count);
            var s = 0;
            for (o = 0; o < this.m_count; o++) {
                var n = this.m_flagsBuffer.data[o];
                if (2 & n) {
                    var r = this.m_world.m_destructionListener;
                    if (512 & n && r && r.SayGoodbyeParticle(this, o), this.m_handleIndexBuffer.data)(a = this.m_handleIndexBuffer.data[o]) && (a.SetIndex(t.b2_invalidParticleIndex), this.m_handleIndexBuffer.data[o] = null);
                    i[o] = t.b2_invalidParticleIndex
                } else {
                    if (i[o] = e, o !== e) {
                        var a;
                        if (this.m_handleIndexBuffer.data)(a = this.m_handleIndexBuffer.data[o]) && a.SetIndex(e), this.m_handleIndexBuffer.data[e] = a;
                        this.m_flagsBuffer.data[e] = this.m_flagsBuffer.data[o], this.m_lastBodyContactStepBuffer.data && (this.m_lastBodyContactStepBuffer.data[e] = this.m_lastBodyContactStepBuffer.data[o]), this.m_bodyContactCountBuffer.data && (this.m_bodyContactCountBuffer.data[e] = this.m_bodyContactCountBuffer.data[o]), this.m_consecutiveContactStepsBuffer.data && (this.m_consecutiveContactStepsBuffer.data[e] = this.m_consecutiveContactStepsBuffer.data[o]), this.m_positionBuffer.data[e].Copy(this.m_positionBuffer.data[o]), this.m_velocityBuffer.data[e].Copy(this.m_velocityBuffer.data[o]), this.m_groupBuffer[e] = this.m_groupBuffer[o], this.m_hasForce && this.m_forceBuffer[e].Copy(this.m_forceBuffer[o]), this.m_staticPressureBuffer && (this.m_staticPressureBuffer[e] = this.m_staticPressureBuffer[o]), this.m_depthBuffer && (this.m_depthBuffer[e] = this.m_depthBuffer[o]), this.m_colorBuffer.data && this.m_colorBuffer.data[e].Copy(this.m_colorBuffer.data[o]), this.m_userDataBuffer.data && (this.m_userDataBuffer.data[e] = this.m_userDataBuffer.data[o]), this.m_expirationTimeBuffer.data && (this.m_expirationTimeBuffer.data[e] = this.m_expirationTimeBuffer.data[o])
                    }
                    e++, s |= n
                }
            }
            for (var l = function (t) {
                return t.index < 0
            }, m = function (t) {
                return t.indexA < 0 || t.indexB < 0
            }, _ = function (t) {
                return t.index < 0
            }, h = function (t) {
                return t.indexA < 0 || t.indexB < 0
            }, u = function (t) {
                return t.indexA < 0 || t.indexB < 0 || t.indexC < 0
            }, c = 0; c < this.m_proxyBuffer.count; c++) {
                var p = this.m_proxyBuffer.data[c];
                p.index = i[p.index]
            }
            this.m_proxyBuffer.RemoveIf(l);
            for (c = 0; c < this.m_contactBuffer.count; c++) {
                (f = this.m_contactBuffer.data[c]).indexA = i[f.indexA], f.indexB = i[f.indexB]
            }
            this.m_contactBuffer.RemoveIf(m);
            for (c = 0; c < this.m_bodyContactBuffer.count; c++) {
                var f;
                (f = this.m_bodyContactBuffer.data[c]).index = i[f.index]
            }
            this.m_bodyContactBuffer.RemoveIf(_);
            for (c = 0; c < this.m_pairBuffer.count; c++) {
                var d = this.m_pairBuffer.data[c];
                d.indexA = i[d.indexA], d.indexB = i[d.indexB]
            }
            this.m_pairBuffer.RemoveIf(h);
            for (c = 0; c < this.m_triadBuffer.count; c++) {
                var y = this.m_triadBuffer.data[c];
                y.indexA = i[y.indexA], y.indexB = i[y.indexB], y.indexC = i[y.indexC]
            }
            if (this.m_triadBuffer.RemoveIf(u), this.m_indexByExpirationTimeBuffer.data)
                for (var b = 0, v = 0; v < this.m_count; v++) {
                    var S = i[this.m_indexByExpirationTimeBuffer.data[v]];
                    S !== t.b2_invalidParticleIndex && (this.m_indexByExpirationTimeBuffer.data[b++] = S)
                }
            for (var x = this.m_groupList; x; x = x.GetNext()) {
                var C = e,
                    A = 0,
                    B = !1;
                for (o = x.m_firstIndex; o < x.m_lastIndex; o++) {
                    var V = i[o];
                    V >= 0 ? (C = b2Min(C, V), A = b2Max(A, V + 1)) : B = !0
                }
                C < A ? (x.m_firstIndex = C, x.m_lastIndex = A, B && 1 & x.m_groupFlags && this.SetGroupFlags(x, 16 | x.m_groupFlags)) : (x.m_firstIndex = 0, x.m_lastIndex = 0, 4 & x.m_groupFlags || this.SetGroupFlags(x, 8 | x.m_groupFlags))
            }
            this.m_count = e, this.m_allParticleFlags = s, this.m_needsUpdateAllParticleFlags = !1;
            for (x = this.m_groupList; x;) {
                var g = x.GetNext();
                8 & x.m_groupFlags && this.DestroyParticleGroup(x), x = g
            }
        }, b2ParticleSystem.prototype.SolveLifetimes = function (t) {
            b2Assert(null !== this.m_expirationTimeBuffer.data), b2Assert(null !== this.m_indexByExpirationTimeBuffer.data), this.m_timeElapsed = this.LifetimeToExpirationTime(t.dt);
            var e = this.GetQuantizedTimeElapsed(),
                i = this.m_expirationTimeBuffer.data,
                o = this.m_indexByExpirationTimeBuffer.data,
                s = this.GetParticleCount();
            if (this.m_expirationTimeBufferRequiresSorting) {
                std_sort(o, 0, s, function (t, e) {
                    var o = i[t],
                        s = i[e],
                        n = o <= 0;
                    return n === s <= 0 ? o > s : n
                }), this.m_expirationTimeBufferRequiresSorting = !1
            }
            for (var n = s - 1; n >= 0; --n) {
                var r = o[n],
                    a = i[r];
                if (e < a || a <= 0) break;
                this.DestroyParticle(r)
            }
        }, b2ParticleSystem.prototype.RotateBuffer = function (t, e, i) {
            if (t !== e && e !== i) {
                if (b2Assert(e >= t && e <= i), std_rotate(this.m_flagsBuffer.data, t, e, i), this.m_lastBodyContactStepBuffer.data && std_rotate(this.m_lastBodyContactStepBuffer.data, t, e, i), this.m_bodyContactCountBuffer.data && std_rotate(this.m_bodyContactCountBuffer.data, t, e, i), this.m_consecutiveContactStepsBuffer.data && std_rotate(this.m_consecutiveContactStepsBuffer.data, t, e, i), std_rotate(this.m_positionBuffer.data, t, e, i), std_rotate(this.m_velocityBuffer.data, t, e, i), std_rotate(this.m_groupBuffer, t, e, i), this.m_hasForce && std_rotate(this.m_forceBuffer, t, e, i), this.m_staticPressureBuffer && std_rotate(this.m_staticPressureBuffer, t, e, i), this.m_depthBuffer && std_rotate(this.m_depthBuffer, t, e, i), this.m_colorBuffer.data && std_rotate(this.m_colorBuffer.data, t, e, i), this.m_userDataBuffer.data && std_rotate(this.m_userDataBuffer.data, t, e, i), this.m_handleIndexBuffer.data) {
                    std_rotate(this.m_handleIndexBuffer.data, t, e, i);
                    for (var o = t; o < i; ++o) {
                        var s = this.m_handleIndexBuffer.data[o];
                        s && s.SetIndex(newIndices(s.GetIndex()))
                    }
                }
                if (this.m_expirationTimeBuffer.data) {
                    std_rotate(this.m_expirationTimeBuffer.data, t, e, i);
                    var n = this.GetParticleCount(),
                        r = this.m_indexByExpirationTimeBuffer.data;
                    for (o = 0; o < n; ++o) r[o] = newIndices(r[o])
                }
                for (var a = 0; a < this.m_proxyBuffer.count; a++) {
                    var l = this.m_proxyBuffer.data[a];
                    l.index = newIndices(l.index)
                }
                for (a = 0; a < this.m_contactBuffer.count; a++) {
                    (m = this.m_contactBuffer.data[a]).indexA = newIndices(m.indexA), m.indexB = newIndices(m.indexB)
                }
                for (a = 0; a < this.m_bodyContactBuffer.count; a++) {
                    var m;
                    (m = this.m_bodyContactBuffer.data[a]).index = newIndices(m.index)
                }
                for (a = 0; a < this.m_pairBuffer.count; a++) {
                    var _ = this.m_pairBuffer.data[a];
                    _.indexA = newIndices(_.indexA), _.indexB = newIndices(_.indexB)
                }
                for (a = 0; a < this.m_triadBuffer.count; a++) {
                    var h = this.m_triadBuffer.data[a];
                    h.indexA = newIndices(h.indexA), h.indexB = newIndices(h.indexB), h.indexC = newIndices(h.indexC)
                }
                for (var u = this.m_groupList; u; u = u.GetNext()) u.m_firstIndex = newIndices(u.m_firstIndex), u.m_lastIndex = newIndices(u.m_lastIndex - 1) + 1
            }

            function newIndices(o) {
                return o < t ? o : o < e ? o + i - e : o < i ? o + t - e : o
            }
        }, b2ParticleSystem.prototype.GetCriticalVelocity = function (t) {
            return this.m_particleDiameter * t.inv_dt
        }, b2ParticleSystem.prototype.GetCriticalVelocitySquared = function (t) {
            var e = this.GetCriticalVelocity(t);
            return e * e
        }, b2ParticleSystem.prototype.GetCriticalPressure = function (t) {
            return this.m_def.density * this.GetCriticalVelocitySquared(t)
        }, b2ParticleSystem.prototype.GetParticleStride = function () {
            return t.b2_particleStride * this.m_particleDiameter
        }, b2ParticleSystem.prototype.GetParticleMass = function () {
            var t = this.GetParticleStride();
            return this.m_def.density * t * t
        }, b2ParticleSystem.prototype.GetParticleInvMass = function () {
            var e = this.m_inverseDiameter * (1 / t.b2_particleStride);
            return this.m_inverseDensity * e * e
        }, b2ParticleSystem.prototype.GetFixtureContactFilter = function () {
            return 65536 & this.m_allParticleFlags ? this.m_world.m_contactManager.m_contactFilter : null
        }, b2ParticleSystem.prototype.GetParticleContactFilter = function () {
            return 131072 & this.m_allParticleFlags ? this.m_world.m_contactManager.m_contactFilter : null
        }, b2ParticleSystem.prototype.GetFixtureContactListener = function () {
            return 16384 & this.m_allParticleFlags ? this.m_world.m_contactManager.m_contactListener : null
        }, b2ParticleSystem.prototype.GetParticleContactListener = function () {
            return 32768 & this.m_allParticleFlags ? this.m_world.m_contactManager.m_contactListener : null
        }, b2ParticleSystem.prototype.SetUserOverridableBuffer = function (t, e, i) {
            b2Assert(null !== e && i > 0 || null === e && 0 === i), t.data = e, t.userSuppliedCapacity = i
        }, b2ParticleSystem.prototype.SetGroupFlags = function (t, e) {
            var i = t.m_groupFlags;
            1 & (i ^ e) && (e |= 16), i & ~e && (this.m_needsUpdateAllGroupFlags = !0), ~this.m_allGroupFlags & e && (1 & e && (this.m_depthBuffer = this.RequestBuffer(this.m_depthBuffer)), this.m_allGroupFlags |= e), t.m_groupFlags = e
        }, b2ParticleSystem.BodyContactCompare = function (t, e) {
            return t.index === e.index ? t.weight > e.weight : t.index < e.index
        }, b2ParticleSystem.prototype.RemoveSpuriousBodyContacts = function () {
            std_sort(this.m_bodyContactBuffer.data, 0, this.m_bodyContactBuffer.count, b2ParticleSystem.BodyContactCompare);
            var e = b2ParticleSystem.RemoveSpuriousBodyContacts_s_n,
                o = b2ParticleSystem.RemoveSpuriousBodyContacts_s_pos,
                s = b2ParticleSystem.RemoveSpuriousBodyContacts_s_normal,
                n = this,
                r = -1,
                a = 0;
            this.m_bodyContactBuffer.count = std_remove_if(this.m_bodyContactBuffer.data, function (l) {
                if (l.index !== r && (a = 0, r = l.index), a++ > 3) return 0, !0;
                var m = e.Copy(l.normal);
                m.SelfMul(n.m_particleDiameter * (1 - l.weight));
                var _ = i.AddVV(n.m_positionBuffer.data[l.index], m, o);
                if (!l.fixture.TestPoint(_)) {
                    for (var h = l.fixture.GetShape().GetChildCount(), u = 0; u < h; u++) {
                        var c = s;
                        if (l.fixture.ComputeDistance(_, c, u) < t.b2_linearSlop) return !1
                    }
                    return 0, !0
                }
                return !1
            }, this.m_bodyContactBuffer.count)
        }, b2ParticleSystem.prototype.DetectStuckParticle = function (t) {
            this.m_stuckThreshold <= 0 || (++this.m_bodyContactCountBuffer.data[t], 2 === this.m_bodyContactCountBuffer.data[t] && (++this.m_consecutiveContactStepsBuffer.data[t], this.m_consecutiveContactStepsBuffer.data[t] > this.m_stuckThreshold && (this.m_stuckParticleBuffer.data[this.m_stuckParticleBuffer.Append()] = t)), this.m_lastBodyContactStepBuffer.data[t] = this.m_timestamp)
        }, b2ParticleSystem.prototype.ValidateParticleIndex = function (e) {
            return e >= 0 && e < this.GetParticleCount() && e !== t.b2_invalidParticleIndex
        }, b2ParticleSystem.prototype.GetQuantizedTimeElapsed = function () {
            return Math.floor(this.m_timeElapsed / 4294967296)
        }, b2ParticleSystem.prototype.LifetimeToExpirationTime = function (t) {
            return this.m_timeElapsed + Math.floor(t / this.m_def.lifetimeGranularity * 4294967296)
        }, b2ParticleSystem.prototype.ForceCanBeApplied = function (t) {
            return !(4 & t)
        }, b2ParticleSystem.prototype.PrepareForceBuffer = function () {
            if (!this.m_hasForce) {
                for (var t = 0; t < this.m_count; t++) this.m_forceBuffer[t].SetZero();
                this.m_hasForce = !0
            }
        }, b2ParticleSystem.prototype.IsRigidGroup = function (t) {
            return null !== t && 0 != (2 & t.m_groupFlags)
        }, b2ParticleSystem.prototype.GetLinearVelocity = function (t, e, i, o) {
            return this.IsRigidGroup(t) ? t.GetLinearVelocityFromWorldPoint(i, o) : o.Copy(this.m_velocityBuffer.data[e])
        }, b2ParticleSystem.prototype.InitDampingParameter = function (t, e, o, s, n, r, a, l) {
            t[0] = s > 0 ? 1 / s : 0, e[0] = n > 0 ? 1 / n : 0, o[0] = i.CrossVV(i.SubVV(a, r, i.s_t0), l)
        }, b2ParticleSystem.prototype.InitDampingParameterWithRigidGroupOrParticle = function (t, e, i, o, s, n, r, a) {
            if (o) this.InitDampingParameter(t, e, i, s.GetMass(), s.GetInertia(), s.GetCenter(), r, a);
            else {
                var l = this.m_flagsBuffer.data[n];
                this.InitDampingParameter(t, e, i, 4 & l ? 0 : this.GetParticleMass(), 0, r, r, a)
            }
        }, b2ParticleSystem.prototype.ComputeDampingImpulse = function (t, e, i, o, s, n, r) {
            var a = t + e * i * i + o + s * n * n;
            return a > 0 ? r / a : 0
        }, b2ParticleSystem.prototype.ApplyDamping = function (t, e, i, o, s, n, r, a) {
            o ? (s.m_linearVelocity.SelfMulAdd(r * t, a), s.m_angularVelocity += r * i * e) : this.m_velocityBuffer.data[n].SelfMulAdd(r * t, a)
        }, b2ParticleSystem.xTruncBits = 12, b2ParticleSystem.yTruncBits = 12, b2ParticleSystem.tagBits = 32, b2ParticleSystem.yOffset = 1 << b2ParticleSystem.yTruncBits - 1, b2ParticleSystem.yShift = b2ParticleSystem.tagBits - b2ParticleSystem.yTruncBits, b2ParticleSystem.xShift = b2ParticleSystem.tagBits - b2ParticleSystem.yTruncBits - b2ParticleSystem.xTruncBits, b2ParticleSystem.xScale = 1 << b2ParticleSystem.xShift, b2ParticleSystem.xOffset = b2ParticleSystem.xScale * (1 << b2ParticleSystem.xTruncBits - 1), b2ParticleSystem.yMask = (1 << b2ParticleSystem.yTruncBits) - 1 << b2ParticleSystem.yShift, b2ParticleSystem.xMask = ~b2ParticleSystem.yMask, b2ParticleSystem.DestroyParticlesInShape_s_aabb = new z, b2ParticleSystem.CreateParticleGroup_s_transform = new a, b2ParticleSystem.ComputeCollisionEnergy_s_v = new i, b2ParticleSystem.QueryShapeAABB_s_aabb = new z, b2ParticleSystem.QueryPointAABB_s_aabb = new z, b2ParticleSystem.RayCast_s_aabb = new z, b2ParticleSystem.RayCast_s_p = new i, b2ParticleSystem.RayCast_s_v = new i, b2ParticleSystem.RayCast_s_n = new i, b2ParticleSystem.RayCast_s_point = new i, b2ParticleSystem.k_pairFlags = 8, b2ParticleSystem.k_triadFlags = 16, b2ParticleSystem.k_noPressureFlags = 192, b2ParticleSystem.k_extraDampingFlags = 2048, b2ParticleSystem.k_barrierWallFlags = 1028, b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_edge = new Bt, b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_d = new i, b2ParticleSystem.CreateParticlesStrokeShapeForGroup_s_p = new i, b2ParticleSystem.CreateParticlesFillShapeForGroup_s_aabb = new z, b2ParticleSystem.CreateParticlesFillShapeForGroup_s_p = new i, b2ParticleSystem.UpdatePairsAndTriads_s_dab = new i, b2ParticleSystem.UpdatePairsAndTriads_s_dbc = new i, b2ParticleSystem.UpdatePairsAndTriads_s_dca = new i, b2ParticleSystem.AddContact_s_d = new i, b2ParticleSystem.UpdateBodyContacts_s_aabb = new z, b2ParticleSystem.Solve_s_subStep = new ut, b2ParticleSystem.SolveCollision_s_aabb = new z, b2ParticleSystem.SolveGravity_s_gravity = new i, b2ParticleSystem.SolveBarrier_s_aabb = new z, b2ParticleSystem.SolveBarrier_s_va = new i, b2ParticleSystem.SolveBarrier_s_vb = new i, b2ParticleSystem.SolveBarrier_s_pba = new i, b2ParticleSystem.SolveBarrier_s_vba = new i, b2ParticleSystem.SolveBarrier_s_vc = new i, b2ParticleSystem.SolveBarrier_s_pca = new i, b2ParticleSystem.SolveBarrier_s_vca = new i, b2ParticleSystem.SolveBarrier_s_qba = new i, b2ParticleSystem.SolveBarrier_s_qca = new i, b2ParticleSystem.SolveBarrier_s_dv = new i, b2ParticleSystem.SolveBarrier_s_f = new i, b2ParticleSystem.SolvePressure_s_f = new i, b2ParticleSystem.SolveDamping_s_v = new i, b2ParticleSystem.SolveDamping_s_f = new i, b2ParticleSystem.SolveRigidDamping_s_t0 = new i, b2ParticleSystem.SolveRigidDamping_s_t1 = new i, b2ParticleSystem.SolveRigidDamping_s_p = new i, b2ParticleSystem.SolveRigidDamping_s_v = new i, b2ParticleSystem.SolveExtraDamping_s_v = new i, b2ParticleSystem.SolveExtraDamping_s_f = new i, b2ParticleSystem.SolveRigid_s_position = new i, b2ParticleSystem.SolveRigid_s_rotation = new r, b2ParticleSystem.SolveRigid_s_transform = new a, b2ParticleSystem.SolveRigid_s_velocityTransform = new a, b2ParticleSystem.SolveElastic_s_pa = new i, b2ParticleSystem.SolveElastic_s_pb = new i, b2ParticleSystem.SolveElastic_s_pc = new i, b2ParticleSystem.SolveElastic_s_r = new r, b2ParticleSystem.SolveElastic_s_t0 = new i, b2ParticleSystem.SolveSpring_s_pa = new i, b2ParticleSystem.SolveSpring_s_pb = new i, b2ParticleSystem.SolveSpring_s_d = new i, b2ParticleSystem.SolveSpring_s_f = new i, b2ParticleSystem.SolveTensile_s_weightedNormal = new i, b2ParticleSystem.SolveTensile_s_s = new i, b2ParticleSystem.SolveTensile_s_f = new i, b2ParticleSystem.SolveViscous_s_v = new i, b2ParticleSystem.SolveViscous_s_f = new i, b2ParticleSystem.SolveRepulsive_s_f = new i, b2ParticleSystem.SolvePowder_s_f = new i, b2ParticleSystem.SolveSolid_s_f = new i, b2ParticleSystem.RemoveSpuriousBodyContacts_s_n = new i, b2ParticleSystem.RemoveSpuriousBodyContacts_s_pos = new i, b2ParticleSystem.RemoveSpuriousBodyContacts_s_normal = new i, b2ParticleSystem
    }();
    t.b2ParticleSystem = ye,
        function (e) {
            var o = function () {
                return function () {
                    this.data = null, this.userSuppliedCapacity = 0
                }
            }();
            e.UserOverridableBuffer = o;
            var s = function () {
                function Proxy() {
                    this.index = t.b2_invalidParticleIndex, this.tag = 0
                }
                return Proxy.CompareProxyProxy = function (t, e) {
                    return t.tag < e.tag
                }, Proxy.CompareTagProxy = function (t, e) {
                    return t < e.tag
                }, Proxy.CompareProxyTag = function (t, e) {
                    return t.tag < e
                }, Proxy
            }();
            e.Proxy = s;
            var n = function () {
                function InsideBoundsEnumerator(t, i, o, s, n) {
                    this.m_system = t, this.m_xLower = (i & e.xMask) >>> 0, this.m_xUpper = (o & e.xMask) >>> 0, this.m_yLower = (i & e.yMask) >>> 0, this.m_yUpper = (o & e.yMask) >>> 0, this.m_first = s, this.m_last = n, b2Assert(this.m_first <= this.m_last)
                }
                return InsideBoundsEnumerator.prototype.GetNext = function () {
                    for (; this.m_first < this.m_last;) {
                        var i = (this.m_system.m_proxyBuffer.data[this.m_first].tag & e.xMask) >>> 0;
                        if (i >= this.m_xLower && i <= this.m_xUpper) return this.m_system.m_proxyBuffer.data[this.m_first++].index;
                        this.m_first++
                    }
                    return t.b2_invalidParticleIndex
                }, InsideBoundsEnumerator
            }();
            e.InsideBoundsEnumerator = n;
            var l = function () {
                return function () {
                    this.list = null, this.next = null, this.count = 0, this.index = 0
                }
            }();
            e.ParticleListNode = l;
            var m = function () {
                function FixedSetAllocator() {}
                return FixedSetAllocator.prototype.Allocate = function (t, e) {
                    return e
                }, FixedSetAllocator.prototype.Clear = function () {}, FixedSetAllocator.prototype.GetCount = function () {
                    return 0
                }, FixedSetAllocator.prototype.Invalidate = function (t) {}, FixedSetAllocator.prototype.GetValidBuffer = function () {
                    return []
                }, FixedSetAllocator.prototype.GetBuffer = function () {
                    return []
                }, FixedSetAllocator.prototype.SetCount = function (t) {}, FixedSetAllocator
            }();
            e.FixedSetAllocator = m;
            var _ = function () {
                return function (e, i) {
                    this.first = null, this.second = t.b2_invalidParticleIndex, this.first = e, this.second = i
                }
            }();
            e.FixtureParticle = _;
            var h = function (e) {
                function FixtureParticleSet() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return __extends(FixtureParticleSet, e), FixtureParticleSet.prototype.Initialize = function (t, e) {}, FixtureParticleSet.prototype.Find = function (e) {
                    return t.b2_invalidParticleIndex
                }, FixtureParticleSet
            }(e.FixedSetAllocator);
            e.FixtureParticleSet = h;
            var u = function () {
                return function (e, i) {
                    this.first = t.b2_invalidParticleIndex, this.second = t.b2_invalidParticleIndex, this.first = e, this.second = i
                }
            }();
            e.ParticlePair = u;
            var c = function (e) {
                function b2ParticlePairSet() {
                    return null !== e && e.apply(this, arguments) || this
                }
                return __extends(b2ParticlePairSet, e), b2ParticlePairSet.prototype.Initialize = function (t, e) {}, b2ParticlePairSet.prototype.Find = function (e) {
                    return t.b2_invalidParticleIndex
                }, b2ParticlePairSet
            }(e.FixedSetAllocator);
            e.b2ParticlePairSet = c;
            var p = function () {
                function ConnectionFilter() {}
                return ConnectionFilter.prototype.IsNecessary = function (t) {
                    return !0
                }, ConnectionFilter.prototype.ShouldCreatePair = function (t, e) {
                    return !0
                }, ConnectionFilter.prototype.ShouldCreateTriad = function (t, e, i) {
                    return !0
                }, ConnectionFilter
            }();
            e.ConnectionFilter = p;
            var f = function (t) {
                function DestroyParticlesInShapeCallback(e, i, o, s) {
                    var n = t.call(this) || this;
                    return n.m_system = null, n.m_shape = null, n.m_xf = null, n.m_callDestructionListener = !1, n.m_destroyed = 0, n.m_system = e, n.m_shape = i, n.m_xf = o, n.m_callDestructionListener = s, n.m_destroyed = 0, n
                }
                return __extends(DestroyParticlesInShapeCallback, t), DestroyParticlesInShapeCallback.prototype.ReportFixture = function (t) {
                    return !1
                }, DestroyParticlesInShapeCallback.prototype.ReportParticle = function (t, e) {
                    return t === this.m_system && (b2Assert(e >= 0 && e < this.m_system.m_count), this.m_shape.TestPoint(this.m_xf, this.m_system.m_positionBuffer.data[e]) && (this.m_system.DestroyParticle(e, this.m_callDestructionListener), this.m_destroyed++), !0)
                }, DestroyParticlesInShapeCallback.prototype.Destroyed = function () {
                    return this.m_destroyed
                }, DestroyParticlesInShapeCallback
            }(_e);
            e.DestroyParticlesInShapeCallback = f;
            var d = function (t) {
                function JoinParticleGroupsFilter(e) {
                    var i = t.call(this) || this;
                    return i.m_threshold = 0, i.m_threshold = e, i
                }
                return __extends(JoinParticleGroupsFilter, t), JoinParticleGroupsFilter.prototype.ShouldCreatePair = function (t, e) {
                    return t < this.m_threshold && this.m_threshold <= e || e < this.m_threshold && this.m_threshold <= t
                }, JoinParticleGroupsFilter.prototype.ShouldCreateTriad = function (t, e, i) {
                    return (t < this.m_threshold || e < this.m_threshold || i < this.m_threshold) && (this.m_threshold <= t || this.m_threshold <= e || this.m_threshold <= i)
                }, JoinParticleGroupsFilter
            }(e.ConnectionFilter);
            e.JoinParticleGroupsFilter = d;
            var y = function (e) {
                function CompositeShape(t, i) {
                    var o = e.call(this, -1, 0) || this;
                    return o.m_shapes = null, o.m_shapeCount = 0, o.m_shapes = t, o.m_shapeCount = i, o
                }
                return __extends(CompositeShape, e), CompositeShape.prototype.Clone = function () {
                    return b2Assert(!1), null
                }, CompositeShape.prototype.GetChildCount = function () {
                    return 1
                }, CompositeShape.prototype.TestPoint = function (t, e) {
                    for (var i = 0; i < this.m_shapeCount; i++)
                        if (this.m_shapes[i].TestPoint(t, e)) return !0;
                    return !1
                }, CompositeShape.prototype.ComputeDistance = function (t, e, i, o) {
                    return b2Assert(!1), 0
                }, CompositeShape.prototype.RayCast = function (t, e, i, o) {
                    return b2Assert(!1), !1
                }, CompositeShape.prototype.ComputeAABB = function (e, i, o) {
                    var s = new z;
                    e.lowerBound.x = +t.b2_maxFloat, e.lowerBound.y = +t.b2_maxFloat, e.upperBound.x = -t.b2_maxFloat, e.upperBound.y = -t.b2_maxFloat, b2Assert(0 === o);
                    for (var n = 0; n < this.m_shapeCount; n++)
                        for (var r = this.m_shapes[n].GetChildCount(), a = 0; a < r; a++) {
                            var l = s;
                            this.m_shapes[n].ComputeAABB(l, i, a), e.Combine1(l)
                        }
                }, CompositeShape.prototype.ComputeMass = function (t, e) {
                    b2Assert(!1)
                }, CompositeShape.prototype.SetupDistanceProxy = function (t, e) {
                    b2Assert(!1)
                }, CompositeShape.prototype.ComputeSubmergedArea = function (t, e, i, o) {
                    return b2Assert(!1), 0
                }, CompositeShape.prototype.Dump = function (t) {
                    b2Assert(!1)
                }, CompositeShape
            }(D);
            e.CompositeShape = y;
            var b = function (t) {
                function ReactiveFilter(e) {
                    var i = t.call(this) || this;
                    return i.m_flagsBuffer = null, i.m_flagsBuffer = e, i
                }
                return __extends(ReactiveFilter, t), ReactiveFilter.prototype.IsNecessary = function (t) {
                    return 0 != (4096 & this.m_flagsBuffer.data[t])
                }, ReactiveFilter
            }(e.ConnectionFilter);
            e.ReactiveFilter = b;
            var v = function (t) {
                function UpdateBodyContactsCallback(e, i) {
                    var o = t.call(this, e) || this;
                    return o.m_contactFilter = i, o
                }
                return __extends(UpdateBodyContactsCallback, t), UpdateBodyContactsCallback.prototype.ShouldCollideFixtureParticle = function (t, e, i) {
                    if (this.m_contactFilter && 65536 & this.m_system.GetFlagsBuffer()[i]) return this.m_contactFilter.ShouldCollideFixtureParticle(t, this.m_system, i);
                    return !0
                }, UpdateBodyContactsCallback.prototype.ReportFixtureAndParticle = function (t, o, s) {
                    var n = e.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_n,
                        r = e.UpdateBodyContactsCallback.ReportFixtureAndParticle_s_rp,
                        a = this.m_system.m_positionBuffer.data[s],
                        l = n,
                        m = t.ComputeDistance(a, l, o);
                    if (m < this.m_system.m_particleDiameter && this.ShouldCollideFixtureParticle(t, this.m_system, s)) {
                        var _ = t.GetBody(),
                            h = _.GetWorldCenter(),
                            u = _.GetMass(),
                            c = _.GetInertia() - u * _.GetLocalCenter().LengthSquared(),
                            p = u > 0 ? 1 / u : 0,
                            f = c > 0 ? 1 / c : 0,
                            d = 4 & this.m_system.m_flagsBuffer.data[s] ? 0 : this.m_system.GetParticleInvMass(),
                            y = i.SubVV(a, h, r),
                            b = i.CrossVV(y, l),
                            v = d + p + f * b * b,
                            S = this.m_system.m_bodyContactBuffer.data[this.m_system.m_bodyContactBuffer.Append()];
                        S.index = s, S.body = _, S.fixture = t, S.weight = 1 - m * this.m_system.m_inverseDiameter, S.normal.Copy(l.SelfNeg()), S.mass = v > 0 ? 1 / v : 0, this.m_system.DetectStuckParticle(s)
                    }
                }, UpdateBodyContactsCallback.ReportFixtureAndParticle_s_n = new i, UpdateBodyContactsCallback.ReportFixtureAndParticle_s_rp = new i, UpdateBodyContactsCallback
            }(he);
            e.UpdateBodyContactsCallback = v;
            var S = function (o) {
                function SolveCollisionCallback(t, e) {
                    var i = o.call(this, t) || this;
                    return i.m_step = e, i
                }
                return __extends(SolveCollisionCallback, o), SolveCollisionCallback.prototype.ReportFixtureAndParticle = function (o, s, n) {
                    var l = e.SolveCollisionCallback.ReportFixtureAndParticle_s_p1,
                        m = e.SolveCollisionCallback.ReportFixtureAndParticle_s_output,
                        _ = e.SolveCollisionCallback.ReportFixtureAndParticle_s_input,
                        h = e.SolveCollisionCallback.ReportFixtureAndParticle_s_p,
                        u = e.SolveCollisionCallback.ReportFixtureAndParticle_s_v,
                        c = e.SolveCollisionCallback.ReportFixtureAndParticle_s_f,
                        p = o.GetBody(),
                        f = this.m_system.m_positionBuffer.data[n],
                        d = this.m_system.m_velocityBuffer.data[n],
                        y = m,
                        b = _;
                    if (0 === this.m_system.m_iterationIndex) {
                        var v = a.MulTXV(p.m_xf0, f, l);
                        0 === o.GetShape().GetType() && (v.SelfSub(p.GetLocalCenter()), r.MulRV(p.m_xf0.q, v, v), r.MulTRV(p.m_xf.q, v, v), v.SelfAdd(p.GetLocalCenter())), a.MulXV(p.m_xf, v, b.p1)
                    } else b.p1.Copy(f); if (i.AddVMulSV(f, this.m_step.dt, d, b.p2), b.maxFraction = 1, o.RayCast(y, b, s)) {
                        var S = y.normal,
                            x = h;
                        x.x = (1 - y.fraction) * b.p1.x + y.fraction * b.p2.x + t.b2_linearSlop * S.x, x.y = (1 - y.fraction) * b.p1.y + y.fraction * b.p2.y + t.b2_linearSlop * S.y;
                        var C = u;
                        C.x = this.m_step.inv_dt * (x.x - f.x), C.y = this.m_step.inv_dt * (x.y - f.y), this.m_system.m_velocityBuffer.data[n].Copy(C);
                        var A = c;
                        A.x = this.m_step.inv_dt * this.m_system.GetParticleMass() * (d.x - C.x), A.y = this.m_step.inv_dt * this.m_system.GetParticleMass() * (d.y - C.y), this.m_system.ParticleApplyForce(n, A)
                    }
                }, SolveCollisionCallback.prototype.ReportParticle = function (t, e) {
                    return !1
                }, SolveCollisionCallback.ReportFixtureAndParticle_s_p1 = new i, SolveCollisionCallback.ReportFixtureAndParticle_s_output = new q, SolveCollisionCallback.ReportFixtureAndParticle_s_input = new k, SolveCollisionCallback.ReportFixtureAndParticle_s_p = new i, SolveCollisionCallback.ReportFixtureAndParticle_s_v = new i, SolveCollisionCallback.ReportFixtureAndParticle_s_f = new i, SolveCollisionCallback
            }(he);
            e.SolveCollisionCallback = S
        }(ye = t.b2ParticleSystem || (t.b2ParticleSystem = {}));
    var be = function () {
        return function () {
            this.flags = 0, this.groupFlags = 0, this.position = new i, this.angle = 0, this.linearVelocity = new i, this.angularVelocity = 0, this.color = new m, this.strength = 1, this.shape = null, this.shapes = null, this.shapeCount = 0, this.stride = 0, this.particleCount = 0, this.positionData = null, this.lifetime = 0, this.userData = null, this.group = null
        }
    }();
    t.b2ParticleGroupDef = be;
    var ve = function () {
        function b2ParticleGroup() {
            this.m_system = null, this.m_firstIndex = 0, this.m_lastIndex = 0, this.m_groupFlags = 0, this.m_strength = 1, this.m_prev = null, this.m_next = null, this.m_timestamp = -1, this.m_mass = 0, this.m_inertia = 0, this.m_center = new i, this.m_linearVelocity = new i, this.m_angularVelocity = 0, this.m_transform = new a, this.m_userData = null
        }
        return b2ParticleGroup.prototype.GetNext = function () {
            return this.m_next
        }, b2ParticleGroup.prototype.GetParticleSystem = function () {
            return this.m_system
        }, b2ParticleGroup.prototype.GetParticleCount = function () {
            return this.m_lastIndex - this.m_firstIndex
        }, b2ParticleGroup.prototype.GetBufferIndex = function () {
            return this.m_firstIndex
        }, b2ParticleGroup.prototype.ContainsParticle = function (t) {
            return this.m_firstIndex <= t && t < this.m_lastIndex
        }, b2ParticleGroup.prototype.GetAllParticleFlags = function () {
            for (var t = 0, e = this.m_firstIndex; e < this.m_lastIndex; e++) t |= this.m_system.m_flagsBuffer.data[e];
            return t
        }, b2ParticleGroup.prototype.GetGroupFlags = function () {
            return this.m_groupFlags
        }, b2ParticleGroup.prototype.SetGroupFlags = function (t) {
            t |= 24 & this.m_groupFlags, this.m_system.SetGroupFlags(this, t)
        }, b2ParticleGroup.prototype.GetMass = function () {
            return this.UpdateStatistics(), this.m_mass
        }, b2ParticleGroup.prototype.GetInertia = function () {
            return this.UpdateStatistics(), this.m_inertia
        }, b2ParticleGroup.prototype.GetCenter = function () {
            return this.UpdateStatistics(), this.m_center
        }, b2ParticleGroup.prototype.GetLinearVelocity = function () {
            return this.UpdateStatistics(), this.m_linearVelocity
        }, b2ParticleGroup.prototype.GetAngularVelocity = function () {
            return this.UpdateStatistics(), this.m_angularVelocity
        }, b2ParticleGroup.prototype.GetTransform = function () {
            return this.m_transform
        }, b2ParticleGroup.prototype.GetPosition = function () {
            return this.m_transform.p
        }, b2ParticleGroup.prototype.GetAngle = function () {
            return this.m_transform.q.GetAngle()
        }, b2ParticleGroup.prototype.GetLinearVelocityFromWorldPoint = function (t, e) {
            var o = b2ParticleGroup.GetLinearVelocityFromWorldPoint_s_t0;
            return this.UpdateStatistics(), i.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, i.SubVV(t, this.m_center, o), e)
        }, b2ParticleGroup.prototype.GetUserData = function () {
            return this.m_userData
        }, b2ParticleGroup.prototype.SetUserData = function (t) {
            this.m_userData = t
        }, b2ParticleGroup.prototype.ApplyForce = function (t) {
            this.m_system.ApplyForce(this.m_firstIndex, this.m_lastIndex, t)
        }, b2ParticleGroup.prototype.ApplyLinearImpulse = function (t) {
            this.m_system.ApplyLinearImpulse(this.m_firstIndex, this.m_lastIndex, t)
        }, b2ParticleGroup.prototype.DestroyParticles = function (t) {
            if (!this.m_system.m_world.IsLocked())
                for (var e = this.m_firstIndex; e < this.m_lastIndex; e++) this.m_system.DestroyParticle(e, t)
        }, b2ParticleGroup.prototype.UpdateStatistics = function () {
            var t = new i,
                e = new i;
            if (this.m_timestamp !== this.m_system.m_timestamp) {
                var o = this.m_system.GetParticleMass();
                this.m_mass = o * (this.m_lastIndex - this.m_firstIndex), this.m_center.SetZero(), this.m_linearVelocity.SetZero();
                for (var s = this.m_firstIndex; s < this.m_lastIndex; s++) this.m_center.SelfMulAdd(o, this.m_system.m_positionBuffer.data[s]), this.m_linearVelocity.SelfMulAdd(o, this.m_system.m_velocityBuffer.data[s]);
                if (this.m_mass > 0) {
                    var n = 1 / this.m_mass;
                    this.m_center.SelfMul(n), this.m_linearVelocity.SelfMul(n)
                }
                this.m_inertia = 0, this.m_angularVelocity = 0;
                for (s = this.m_firstIndex; s < this.m_lastIndex; s++) i.SubVV(this.m_system.m_positionBuffer.data[s], this.m_center, t), i.SubVV(this.m_system.m_velocityBuffer.data[s], this.m_linearVelocity, e), this.m_inertia += o * i.DotVV(t, t), this.m_angularVelocity += o * i.CrossVV(t, e);
                this.m_inertia > 0 && (this.m_angularVelocity *= 1 / this.m_inertia), this.m_timestamp = this.m_system.m_timestamp
            }
        }, b2ParticleGroup.GetLinearVelocityFromWorldPoint_s_t0 = new i, b2ParticleGroup
    }();
    t.b2ParticleGroup = ve;
    var Se = function () {
        function b2DestructionListener() {}
        return b2DestructionListener.prototype.SayGoodbyeJoint = function (t) {}, b2DestructionListener.prototype.SayGoodbyeFixture = function (t) {}, b2DestructionListener.prototype.SayGoodbyeParticleGroup = function (t) {}, b2DestructionListener.prototype.SayGoodbyeParticle = function (t, e) {}, b2DestructionListener
    }();
    t.b2DestructionListener = Se;
    var xe = function () {
        function b2ContactFilter() {}
        return b2ContactFilter.prototype.ShouldCollide = function (t, e) {
            var i = t.GetBody(),
                o = e.GetBody();
            if (0 === o.GetType() && 0 === i.GetType()) return !1;
            if (!o.ShouldCollideConnected(i)) return !1;
            var s = t.GetFilterData(),
                n = e.GetFilterData();
            return s.groupIndex === n.groupIndex && 0 !== s.groupIndex ? s.groupIndex > 0 : 0 != (s.maskBits & n.categoryBits) && 0 != (s.categoryBits & n.maskBits)
        }, b2ContactFilter.prototype.ShouldCollideFixtureParticle = function (t, e, i) {
            return !0
        }, b2ContactFilter.prototype.ShouldCollideParticleParticle = function (t, e, i) {
            return !0
        }, b2ContactFilter.b2_defaultFilter = new b2ContactFilter, b2ContactFilter
    }();
    t.b2ContactFilter = xe;
    var Ce = function () {
        return function () {
            this.normalImpulses = b2MakeNumberArray(t.b2_maxManifoldPoints), this.tangentImpulses = b2MakeNumberArray(t.b2_maxManifoldPoints), this.count = 0
        }
    }();
    t.b2ContactImpulse = Ce;
    var Ae = function () {
        function b2ContactListener() {}
        return b2ContactListener.prototype.BeginContact = function (t) {}, b2ContactListener.prototype.EndContact = function (t) {}, b2ContactListener.prototype.BeginContactFixtureParticle = function (t, e) {}, b2ContactListener.prototype.EndContactFixtureParticle = function (t, e) {}, b2ContactListener.prototype.BeginContactParticleParticle = function (t, e) {}, b2ContactListener.prototype.EndContactParticleParticle = function (t, e) {}, b2ContactListener.prototype.PreSolve = function (t, e) {}, b2ContactListener.prototype.PostSolve = function (t, e) {}, b2ContactListener.b2_defaultListener = new b2ContactListener, b2ContactListener
    }();
    t.b2ContactListener = Ae;
    var Be = function () {
        function b2RayCastCallback() {}
        return b2RayCastCallback.prototype.ReportFixture = function (t, e, i, o) {
            return o
        }, b2RayCastCallback.prototype.ReportParticle = function (t, e, i, o, s) {
            return 0
        }, b2RayCastCallback.prototype.ShouldQueryParticleSystem = function (t) {
            return !0
        }, b2RayCastCallback
    }();
    t.b2RayCastCallback = Be;
    var Ve = function () {
        function b2Island() {
            this.m_allocator = null, this.m_listener = null, this.m_bodies = [], this.m_contacts = [], this.m_joints = [], this.m_positions = ct.MakeArray(1024), this.m_velocities = pt.MakeArray(1024), this.m_bodyCount = 0, this.m_jointCount = 0, this.m_contactCount = 0, this.m_bodyCapacity = 0, this.m_contactCapacity = 0, this.m_jointCapacity = 0
        }
        return b2Island.prototype.Initialize = function (t, e, i, o, s) {
            for (this.m_bodyCapacity = t, this.m_contactCapacity = e, this.m_jointCapacity = i, this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0, this.m_allocator = o, this.m_listener = s; this.m_bodies.length < t;) this.m_bodies[this.m_bodies.length] = null;
            for (; this.m_contacts.length < e;) this.m_contacts[this.m_contacts.length] = null;
            for (; this.m_joints.length < i;) this.m_joints[this.m_joints.length] = null;
            if (this.m_positions.length < t)
                for (var n = b2Max(2 * this.m_positions.length, t); this.m_positions.length < n;) this.m_positions[this.m_positions.length] = new ct;
            if (this.m_velocities.length < t)
                for (n = b2Max(2 * this.m_velocities.length, t); this.m_velocities.length < n;) this.m_velocities[this.m_velocities.length] = new pt
        }, b2Island.prototype.Clear = function () {
            this.m_bodyCount = 0, this.m_contactCount = 0, this.m_jointCount = 0
        }, b2Island.prototype.AddBody = function (t) {
            t.m_islandIndex = this.m_bodyCount, this.m_bodies[this.m_bodyCount++] = t
        }, b2Island.prototype.AddContact = function (t) {
            this.m_contacts[this.m_contactCount++] = t
        }, b2Island.prototype.AddJoint = function (t) {
            this.m_joints[this.m_jointCount++] = t
        }, b2Island.prototype.Solve = function (e, o, s, n) {
            for (var r = b2Island.s_timer.Reset(), a = o.dt, l = 0; l < this.m_bodyCount; ++l) {
                var m = this.m_bodies[l];
                this.m_positions[l].c.Copy(m.m_sweep.c);
                var _ = m.m_sweep.a,
                    h = this.m_velocities[l].v.Copy(m.m_linearVelocity),
                    u = m.m_angularVelocity;
                m.m_sweep.c0.Copy(m.m_sweep.c), m.m_sweep.a0 = m.m_sweep.a, 2 === m.m_type && (h.x += a * (m.m_gravityScale * s.x + m.m_invMass * m.m_force.x), h.y += a * (m.m_gravityScale * s.y + m.m_invMass * m.m_force.y), u += a * m.m_invI * m.m_torque, h.SelfMul(1 / (1 + a * m.m_linearDamping)), u *= 1 / (1 + a * m.m_angularDamping)), this.m_positions[l].a = _, this.m_velocities[l].w = u
            }
            r.Reset();
            var c = b2Island.s_solverData;
            c.step.Copy(o), c.positions = this.m_positions, c.velocities = this.m_velocities;
            var p = b2Island.s_contactSolverDef;
            p.step.Copy(o), p.contacts = this.m_contacts, p.count = this.m_contactCount, p.positions = this.m_positions, p.velocities = this.m_velocities, p.allocator = this.m_allocator;
            var f = b2Island.s_contactSolver.Initialize(p);
            f.InitializeVelocityConstraints(), o.warmStarting && f.WarmStart();
            for (l = 0; l < this.m_jointCount; ++l) this.m_joints[l].InitVelocityConstraints(c);
            e.solveInit = r.GetMilliseconds(), r.Reset();
            for (l = 0; l < o.velocityIterations; ++l) {
                for (var d = 0; d < this.m_jointCount; ++d) this.m_joints[d].SolveVelocityConstraints(c);
                f.SolveVelocityConstraints()
            }
            f.StoreImpulses(), e.solveVelocity = r.GetMilliseconds();
            for (l = 0; l < this.m_bodyCount; ++l) {
                var y = this.m_positions[l].c,
                    b = (_ = this.m_positions[l].a, h = this.m_velocities[l].v, u = this.m_velocities[l].w, i.MulSV(a, h, b2Island.s_translation));
                if (i.DotVV(b, b) > t.b2_maxTranslationSquared) {
                    var v = t.b2_maxTranslation / b.Length();
                    h.SelfMul(v)
                }
                var S = a * u;
                if (S * S > t.b2_maxRotationSquared) u *= v = t.b2_maxRotation / b2Abs(S);
                y.x += a * h.x, y.y += a * h.y, _ += a * u, this.m_positions[l].a = _, this.m_velocities[l].w = u
            }
            r.Reset();
            var x = !1;
            for (l = 0; l < o.positionIterations; ++l) {
                var C = f.SolvePositionConstraints(),
                    A = !0;
                for (d = 0; d < this.m_jointCount; ++d) {
                    var B = this.m_joints[d].SolvePositionConstraints(c);
                    A = A && B
                }
                if (C && A) {
                    x = !0;
                    break
                }
            }
            for (l = 0; l < this.m_bodyCount; ++l) {
                var V = this.m_bodies[l];
                V.m_sweep.c.Copy(this.m_positions[l].c), V.m_sweep.a = this.m_positions[l].a, V.m_linearVelocity.Copy(this.m_velocities[l].v), V.m_angularVelocity = this.m_velocities[l].w, V.SynchronizeTransform()
            }
            if (e.solvePosition = r.GetMilliseconds(), this.Report(f.m_velocityConstraints), n) {
                var g = t.b2_maxFloat,
                    P = t.b2_linearSleepTolerance * t.b2_linearSleepTolerance,
                    w = t.b2_angularSleepTolerance * t.b2_angularSleepTolerance;
                for (l = 0; l < this.m_bodyCount; ++l) {
                    0 !== (m = this.m_bodies[l]).GetType() && (!m.m_autoSleepFlag || m.m_angularVelocity * m.m_angularVelocity > w || i.DotVV(m.m_linearVelocity, m.m_linearVelocity) > P ? (m.m_sleepTime = 0, g = 0) : (m.m_sleepTime += a, g = b2Min(g, m.m_sleepTime)))
                }
                if (g >= t.b2_timeToSleep && x)
                    for (l = 0; l < this.m_bodyCount; ++l) {
                        (m = this.m_bodies[l]).SetAwake(!1)
                    }
            }
        }, b2Island.prototype.SolveTOI = function (e, o, s) {
            for (var n = 0; n < this.m_bodyCount; ++n) {
                var r = this.m_bodies[n];
                this.m_positions[n].c.Copy(r.m_sweep.c), this.m_positions[n].a = r.m_sweep.a, this.m_velocities[n].v.Copy(r.m_linearVelocity), this.m_velocities[n].w = r.m_angularVelocity
            }
            var a = b2Island.s_contactSolverDef;
            a.contacts = this.m_contacts, a.count = this.m_contactCount, a.allocator = this.m_allocator, a.step.Copy(e), a.positions = this.m_positions, a.velocities = this.m_velocities;
            var l = b2Island.s_contactSolver.Initialize(a);
            for (n = 0; n < e.positionIterations; ++n) {
                if (l.SolveTOIPositionConstraints(o, s)) break
            }
            this.m_bodies[o].m_sweep.c0.Copy(this.m_positions[o].c), this.m_bodies[o].m_sweep.a0 = this.m_positions[o].a, this.m_bodies[s].m_sweep.c0.Copy(this.m_positions[s].c), this.m_bodies[s].m_sweep.a0 = this.m_positions[s].a, l.InitializeVelocityConstraints();
            for (n = 0; n < e.velocityIterations; ++n) l.SolveVelocityConstraints();
            var m = e.dt;
            for (n = 0; n < this.m_bodyCount; ++n) {
                var _ = this.m_positions[n].c,
                    h = this.m_positions[n].a,
                    u = this.m_velocities[n].v,
                    c = this.m_velocities[n].w,
                    p = i.MulSV(m, u, b2Island.s_translation);
                if (i.DotVV(p, p) > t.b2_maxTranslationSquared) {
                    var f = t.b2_maxTranslation / p.Length();
                    u.SelfMul(f)
                }
                var d = m * c;
                if (d * d > t.b2_maxRotationSquared) c *= f = t.b2_maxRotation / b2Abs(d);
                _.SelfMulAdd(m, u), h += m * c, this.m_positions[n].a = h, this.m_velocities[n].w = c;
                var y = this.m_bodies[n];
                y.m_sweep.c.Copy(_), y.m_sweep.a = h, y.m_linearVelocity.Copy(u), y.m_angularVelocity = c, y.SynchronizeTransform()
            }
            this.Report(l.m_velocityConstraints)
        }, b2Island.prototype.Report = function (t) {
            if (null !== this.m_listener)
                for (var e = 0; e < this.m_contactCount; ++e) {
                    var i = this.m_contacts[e];
                    if (i) {
                        var o = t[e],
                            s = b2Island.s_impulse;
                        s.count = o.pointCount;
                        for (var n = 0; n < o.pointCount; ++n) s.normalImpulses[n] = o.points[n].normalImpulse, s.tangentImpulses[n] = o.points[n].tangentImpulse;
                        this.m_listener.PostSolve(i, s)
                    }
                }
        }, b2Island.s_timer = new h, b2Island.s_solverData = new ft, b2Island.s_contactSolverDef = new ie, b2Island.s_contactSolver = new se, b2Island.s_translation = new i, b2Island.s_impulse = new Ce, b2Island
    }();
    t.b2Island = Ve;
    var ge = function () {
        function b2World(t) {
            this.m_newFixture = !1, this.m_locked = !1, this.m_clearForces = !0, this.m_contactManager = new Ai, this.m_bodyList = null, this.m_jointList = null, this.m_particleSystemList = null, this.m_bodyCount = 0, this.m_jointCount = 0, this.m_gravity = new i, this.m_allowSleep = !0, this.m_destructionListener = null, this.m_debugDraw = null, this.m_inv_dt0 = 0, this.m_warmStarting = !0, this.m_continuousPhysics = !0, this.m_subStepping = !1, this.m_stepComplete = !0, this.m_profile = new ht, this.m_island = new Ve, this.s_stack = [], this.m_gravity.Copy(t)
        }
        return b2World.prototype.SetDestructionListener = function (t) {
            this.m_destructionListener = t
        }, b2World.prototype.SetContactFilter = function (t) {
            this.m_contactManager.m_contactFilter = t
        }, b2World.prototype.SetContactListener = function (t) {
            this.m_contactManager.m_contactListener = t
        }, b2World.prototype.SetDebugDraw = function (t) {
            this.m_debugDraw = t
        }, b2World.prototype.CreateBody = function (t) {
            if (this.IsLocked()) return null;
            var e = new we(t, this);
            return e.m_prev = null, e.m_next = this.m_bodyList, this.m_bodyList && (this.m_bodyList.m_prev = e), this.m_bodyList = e, ++this.m_bodyCount, e
        }, b2World.prototype.DestroyBody = function (t) {
            if (!this.IsLocked()) {
                for (var e = t.m_jointList; e;) {
                    var i = e;
                    e = e.next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeJoint(i.joint), this.DestroyJoint(i.joint), t.m_jointList = e
                }
                t.m_jointList = null;
                for (var o = t.m_contactList; o;) {
                    var s = o;
                    o = o.next, this.m_contactManager.Destroy(s.contact)
                }
                t.m_contactList = null;
                for (var n = t.m_fixtureList; n;) {
                    var r = n;
                    n = n.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(r), r.DestroyProxies(this.m_contactManager.m_broadPhase), r.Destroy(), t.m_fixtureList = n, t.m_fixtureCount -= 1
                }
                t.m_fixtureList = null, t.m_fixtureCount = 0, t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t === this.m_bodyList && (this.m_bodyList = t.m_next), --this.m_bodyCount
            }
        }, b2World.prototype.CreateJoint = function (t) {
            if (this.IsLocked()) return null;
            var e = Kt.Create(t, null);
            e.m_prev = null, e.m_next = this.m_jointList, this.m_jointList && (this.m_jointList.m_prev = e), this.m_jointList = e, ++this.m_jointCount, e.m_edgeA.joint = e, e.m_edgeA.other = e.m_bodyB, e.m_edgeA.prev = null, e.m_edgeA.next = e.m_bodyA.m_jointList, e.m_bodyA.m_jointList && (e.m_bodyA.m_jointList.prev = e.m_edgeA), e.m_bodyA.m_jointList = e.m_edgeA, e.m_edgeB.joint = e, e.m_edgeB.other = e.m_bodyA, e.m_edgeB.prev = null, e.m_edgeB.next = e.m_bodyB.m_jointList, e.m_bodyB.m_jointList && (e.m_bodyB.m_jointList.prev = e.m_edgeB), e.m_bodyB.m_jointList = e.m_edgeB;
            var i = t.bodyA,
                o = t.bodyB;
            if (!t.collideConnected)
                for (var s = o.GetContactList(); s;) s.other === i && s.contact.FlagForFiltering(), s = s.next;
            return e
        }, b2World.prototype.DestroyJoint = function (t) {
            if (!this.IsLocked()) {
                var e = t.m_collideConnected;
                t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t === this.m_jointList && (this.m_jointList = t.m_next);
                var i = t.m_bodyA,
                    o = t.m_bodyB;
                if (i.SetAwake(!0), o.SetAwake(!0), t.m_edgeA.prev && (t.m_edgeA.prev.next = t.m_edgeA.next), t.m_edgeA.next && (t.m_edgeA.next.prev = t.m_edgeA.prev), t.m_edgeA === i.m_jointList && (i.m_jointList = t.m_edgeA.next), t.m_edgeA.prev = null, t.m_edgeA.next = null, t.m_edgeB.prev && (t.m_edgeB.prev.next = t.m_edgeB.next), t.m_edgeB.next && (t.m_edgeB.next.prev = t.m_edgeB.prev), t.m_edgeB === o.m_jointList && (o.m_jointList = t.m_edgeB.next), t.m_edgeB.prev = null, t.m_edgeB.next = null, Kt.Destroy(t, null), --this.m_jointCount, !e)
                    for (var s = o.GetContactList(); s;) s.other === i && s.contact.FlagForFiltering(), s = s.next
            }
        }, b2World.prototype.CreateParticleSystem = function (t) {
            if (this.IsLocked()) return null;
            var e = new ye(t, this);
            return e.m_prev = null, e.m_next = this.m_particleSystemList, this.m_particleSystemList && (this.m_particleSystemList.m_prev = e), this.m_particleSystemList = e, e
        }, b2World.prototype.DestroyParticleSystem = function (t) {
            this.IsLocked() || (t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t === this.m_particleSystemList && (this.m_particleSystemList = t.m_next))
        }, b2World.prototype.CalculateReasonableParticleIterations = function (e) {
            if (null === this.m_particleSystemList) return 1;
            return b2CalculateParticleIterations(this.m_gravity.Length(), function (e) {
                for (var i = t.b2_maxFloat, o = e.GetParticleSystemList(); null !== o; o = o.m_next) i = b2Min(i, o.GetRadius());
                return i
            }(this), e)
        }, b2World.prototype.Step = function (t, e, i, o) {
            void 0 === o && (o = this.CalculateReasonableParticleIterations(t));
            var s = b2World.Step_s_stepTimer.Reset();
            this.m_newFixture && (this.m_contactManager.FindNewContacts(), this.m_newFixture = !1), this.m_locked = !0;
            var n = b2World.Step_s_step;
            n.dt = t, n.velocityIterations = e, n.positionIterations = i, n.particleIterations = o, n.inv_dt = t > 0 ? 1 / t : 0, n.dtRatio = this.m_inv_dt0 * t, n.warmStarting = this.m_warmStarting;
            var r = b2World.Step_s_timer.Reset();
            if (this.m_contactManager.Collide(), this.m_profile.collide = r.GetMilliseconds(), this.m_stepComplete && n.dt > 0) {
                for (var a = b2World.Step_s_timer.Reset(), l = this.m_particleSystemList; l; l = l.m_next) l.Solve(n);
                this.Solve(n), this.m_profile.solve = a.GetMilliseconds()
            }
            if (this.m_continuousPhysics && n.dt > 0) {
                var m = b2World.Step_s_timer.Reset();
                this.SolveTOI(n), this.m_profile.solveTOI = m.GetMilliseconds()
            }
            n.dt > 0 && (this.m_inv_dt0 = n.inv_dt), this.m_clearForces && this.ClearForces(), this.m_locked = !1, this.m_profile.step = s.GetMilliseconds()
        }, b2World.prototype.ClearForces = function () {
            for (var t = this.m_bodyList; t; t = t.m_next) t.m_force.SetZero(), t.m_torque = 0
        }, b2World.prototype.DrawParticleSystem = function (t) {
            var e = t.GetParticleCount();
            if (e) {
                var i = t.GetRadius(),
                    o = t.GetPositionBuffer();
                if (t.m_colorBuffer.data) {
                    var s = t.GetColorBuffer();
                    this.m_debugDraw.DrawParticles(o, i, s, e)
                } else this.m_debugDraw.DrawParticles(o, i, null, e)
            }
        }, b2World.prototype.DrawDebugData = function () {
            if (null !== this.m_debugDraw) {
                var t = this.m_debugDraw.GetFlags(),
                    e = b2World.DrawDebugData_s_color.SetRGB(0, 0, 0);
                if (1 & t)
                    for (var i = this.m_bodyList; i; i = i.m_next) {
                        var o = i.m_xf;
                        this.m_debugDraw.PushTransform(o);
                        for (var s = i.GetFixtureList(); s; s = s.m_next) i.IsActive() ? 0 === i.GetType() ? (e.SetRGB(.5, .9, .5), this.DrawShape(s, e)) : 1 === i.GetType() ? (e.SetRGB(.5, .5, .9), this.DrawShape(s, e)) : i.IsAwake() ? (e.SetRGB(.9, .7, .7), this.DrawShape(s, e)) : (e.SetRGB(.6, .6, .6), this.DrawShape(s, e)) : (e.SetRGB(.5, .5, .3), this.DrawShape(s, e));
                        this.m_debugDraw.PopTransform(o)
                    }
                if (32 & t)
                    for (var n = this.m_particleSystemList; n; n = n.m_next) this.DrawParticleSystem(n);
                if (2 & t)
                    for (var r = this.m_jointList; r; r = r.m_next) this.DrawJoint(r);
                if (4 & t) {
                    e.SetRGB(.9, .3, .9);
                    var a = this.m_contactManager.m_broadPhase,
                        l = b2World.DrawDebugData_s_vs;
                    for (i = this.m_bodyList; i; i = i.m_next)
                        if (i.IsActive())
                            for (s = i.GetFixtureList(); s; s = s.m_next)
                                for (var m = 0; m < s.m_proxyCount; ++m) {
                                    var _ = s.m_proxies[m],
                                        h = a.GetFatAABB(_.proxy);
                                    l[0].Set(h.lowerBound.x, h.lowerBound.y), l[1].Set(h.upperBound.x, h.lowerBound.y), l[2].Set(h.upperBound.x, h.upperBound.y), l[3].Set(h.lowerBound.x, h.upperBound.y), this.m_debugDraw.DrawPolygon(l, 4, e)
                                }
                }
                if (16 & t)
                    for (i = this.m_bodyList; i; i = i.m_next) {
                        (o = b2World.DrawDebugData_s_xf).q.Copy(i.m_xf.q), o.p.Copy(i.GetWorldCenter()), this.m_debugDraw.DrawTransform(o)
                    }
            }
        }, b2World.prototype.QueryAABB = function (t, e) {
            var i = this.m_contactManager.m_broadPhase;
            if (i.Query(function (e) {
                var o = i.GetUserData(e).fixture;
                return t instanceof _e ? t.ReportFixture(o) : t(o)
            }, e), t instanceof _e)
                for (var o = this.m_particleSystemList; o; o = o.m_next) t.ShouldQueryParticleSystem(o) && o.QueryAABB(t, e)
        }, b2World.prototype.QueryShape = function (t, e, i) {
            var o = this.m_contactManager.m_broadPhase;
            var s = b2World.QueryShape_s_aabb;
            if (e.ComputeAABB(s, i, 0), o.Query(function (s) {
                var n = o.GetUserData(s).fixture;
                return !b2TestOverlapShape(e, 0, n.GetShape(), 0, i, n.GetBody().GetTransform()) || (t instanceof _e ? t.ReportFixture(n) : t(n))
            }, s), t instanceof _e)
                for (var n = this.m_particleSystemList; n; n = n.m_next) t.ShouldQueryParticleSystem(n) && n.QueryAABB(t, s)
        }, b2World.prototype.QueryPoint = function (e, i) {
            var o = this.m_contactManager.m_broadPhase;
            var s = b2World.QueryPoint_s_aabb;
            if (s.lowerBound.Set(i.x - t.b2_linearSlop, i.y - t.b2_linearSlop), s.upperBound.Set(i.x + t.b2_linearSlop, i.y + t.b2_linearSlop), o.Query(function (t) {
                var s = o.GetUserData(t).fixture;
                return !s.TestPoint(i) || (e instanceof _e ? e.ReportFixture(s) : e(s))
            }, s), e instanceof _e)
                for (var n = this.m_particleSystemList; n; n = n.m_next) e.ShouldQueryParticleSystem(n) && n.QueryAABB(e, s)
        }, b2World.prototype.RayCast = function (t, e, i) {
            var o = this.m_contactManager.m_broadPhase;
            var s = b2World.RayCast_s_input;
            if (s.maxFraction = 1, s.p1.Copy(e), s.p2.Copy(i), o.RayCast(function (s, n) {
                var r = o.GetUserData(n),
                    a = r.fixture,
                    l = r.childIndex,
                    m = b2World.RayCast_s_output;
                if (a.RayCast(m, s, l)) {
                    var _ = m.fraction,
                        h = b2World.RayCast_s_point;
                    return h.Set((1 - _) * e.x + _ * i.x, (1 - _) * e.y + _ * i.y), "function" == typeof t ? t(a, h, m.normal, _) : t.ReportFixture(a, h, m.normal, _)
                }
                return s.maxFraction
            }, s), t instanceof Be)
                for (var n = this.m_particleSystemList; n; n = n.m_next) t.ShouldQueryParticleSystem(n) && n.RayCast(t, e, i)
        }, b2World.prototype.RayCastOne = function (t, e) {
            var i = null,
                o = 1;
            return this.RayCast(function (t, e, s, n) {
                return n < o && (o = n, i = t), o
            }, t, e), i
        }, b2World.prototype.RayCastAll = function (t, e, i) {
            return void 0 === i && (i = []), this.RayCast(function (t, e, o, s) {
                return i.push(t), 1
            }, t, e), i
        }, b2World.prototype.GetBodyList = function () {
            return this.m_bodyList
        }, b2World.prototype.GetJointList = function () {
            return this.m_jointList
        }, b2World.prototype.GetParticleSystemList = function () {
            return this.m_particleSystemList
        }, b2World.prototype.GetContactList = function () {
            return this.m_contactManager.m_contactList
        }, b2World.prototype.SetAllowSleeping = function (t) {
            if (t !== this.m_allowSleep && (this.m_allowSleep = t, !this.m_allowSleep))
                for (var e = this.m_bodyList; e; e = e.m_next) e.SetAwake(!0)
        }, b2World.prototype.GetAllowSleeping = function () {
            return this.m_allowSleep
        }, b2World.prototype.SetWarmStarting = function (t) {
            this.m_warmStarting = t
        }, b2World.prototype.GetWarmStarting = function () {
            return this.m_warmStarting
        }, b2World.prototype.SetContinuousPhysics = function (t) {
            this.m_continuousPhysics = t
        }, b2World.prototype.GetContinuousPhysics = function () {
            return this.m_continuousPhysics
        }, b2World.prototype.SetSubStepping = function (t) {
            this.m_subStepping = t
        }, b2World.prototype.GetSubStepping = function () {
            return this.m_subStepping
        }, b2World.prototype.GetProxyCount = function () {
            return this.m_contactManager.m_broadPhase.GetProxyCount()
        }, b2World.prototype.GetBodyCount = function () {
            return this.m_bodyCount
        }, b2World.prototype.GetJointCount = function () {
            return this.m_jointCount
        }, b2World.prototype.GetContactCount = function () {
            return this.m_contactManager.m_contactCount
        }, b2World.prototype.GetTreeHeight = function () {
            return this.m_contactManager.m_broadPhase.GetTreeHeight()
        }, b2World.prototype.GetTreeBalance = function () {
            return this.m_contactManager.m_broadPhase.GetTreeBalance()
        }, b2World.prototype.GetTreeQuality = function () {
            return this.m_contactManager.m_broadPhase.GetTreeQuality()
        }, b2World.prototype.SetGravity = function (t, e) {
            if (void 0 === e && (e = !0), !i.IsEqualToV(this.m_gravity, t) && (this.m_gravity.Copy(t), e))
                for (var o = this.m_bodyList; o; o = o.m_next) o.SetAwake(!0)
        }, b2World.prototype.GetGravity = function () {
            return this.m_gravity
        }, b2World.prototype.IsLocked = function () {
            return this.m_locked
        }, b2World.prototype.SetAutoClearForces = function (t) {
            this.m_clearForces = t
        }, b2World.prototype.GetAutoClearForces = function () {
            return this.m_clearForces
        }, b2World.prototype.ShiftOrigin = function (t) {
            if (!this.IsLocked()) {
                for (var e = this.m_bodyList; e; e = e.m_next) e.m_xf.p.SelfSub(t), e.m_sweep.c0.SelfSub(t), e.m_sweep.c.SelfSub(t);
                for (var i = this.m_jointList; i; i = i.m_next) i.ShiftOrigin(t);
                this.m_contactManager.m_broadPhase.ShiftOrigin(t)
            }
        }, b2World.prototype.GetContactManager = function () {
            return this.m_contactManager
        }, b2World.prototype.GetProfile = function () {
            return this.m_profile
        }, b2World.prototype.Dump = function (t) {
            if (!this.m_locked) {
                t("const g: b2Vec2 = new b2Vec2(%.15f, %.15f);\n", this.m_gravity.x, this.m_gravity.y), t("this.m_world.SetGravity(g);\n"), t("const bodies: b2Body[] = [];\n"), t("const joints: b2Joint[] = [];\n");
                for (var e = 0, i = this.m_bodyList; i; i = i.m_next) i.m_islandIndex = e, i.Dump(t), ++e;
                e = 0;
                for (var o = this.m_jointList; o; o = o.m_next) o.m_index = e, ++e;
                for (o = this.m_jointList; o; o = o.m_next) 6 !== o.m_type && (t("{\n"), o.Dump(t), t("}\n"));
                for (o = this.m_jointList; o; o = o.m_next) 6 === o.m_type && (t("{\n"), o.Dump(t), t("}\n"))
            }
        }, b2World.prototype.DrawJoint = function (t) {
            var e = t.GetBodyA(),
                i = t.GetBodyB(),
                o = e.m_xf,
                s = i.m_xf,
                n = o.p,
                r = s.p,
                a = t.GetAnchorA(b2World.DrawJoint_s_p1),
                l = t.GetAnchorB(b2World.DrawJoint_s_p2),
                m = b2World.DrawJoint_s_color.SetRGB(.5, .8, .8);
            switch (t.m_type) {
            case 3:
                this.m_debugDraw.DrawSegment(a, l, m);
                break;
            case 4:
                var _ = t,
                    h = _.GetGroundAnchorA(),
                    u = _.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(h, a, m), this.m_debugDraw.DrawSegment(u, l, m), this.m_debugDraw.DrawSegment(h, u, m);
                break;
            case 5:
                this.m_debugDraw.DrawSegment(a, l, m);
                break;
            default:
                this.m_debugDraw.DrawSegment(n, a, m), this.m_debugDraw.DrawSegment(a, l, m), this.m_debugDraw.DrawSegment(r, l, m)
            }
        }, b2World.prototype.DrawShape = function (t, e) {
            var o = t.GetShape();
            switch (o.m_type) {
            case 0:
                var s = o,
                    n = s.m_p,
                    r = s.m_radius,
                    a = i.UNITX;
                this.m_debugDraw.DrawSolidCircle(n, r, a, e);
                break;
            case 1:
                var l = o,
                    m = l.m_vertex1,
                    _ = l.m_vertex2;
                this.m_debugDraw.DrawSegment(m, _, e);
                break;
            case 3:
                var h = o,
                    u = h.m_count;
                m = (d = h.m_vertices)[0];
                this.m_debugDraw.DrawCircle(m, .05, e);
                for (var c = 1; c < u; ++c) {
                    _ = d[c];
                    this.m_debugDraw.DrawSegment(m, _, e), this.m_debugDraw.DrawCircle(_, .05, e), m = _
                }
                break;
            case 2:
                var p = o,
                    f = p.m_count,
                    d = p.m_vertices;
                this.m_debugDraw.DrawSolidPolygon(d, f, e)
            }
        }, b2World.prototype.Solve = function (t) {
            for (var e = this.m_bodyList; e; e = e.m_next) e.m_xf0.Copy(e.m_xf);
            this.m_profile.solveInit = 0, this.m_profile.solveVelocity = 0, this.m_profile.solvePosition = 0;
            var i = this.m_island;
            i.Initialize(this.m_bodyCount, this.m_contactManager.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener);
            for (e = this.m_bodyList; e; e = e.m_next) e.m_islandFlag = !1;
            for (var o = this.m_contactManager.m_contactList; o; o = o.m_next) o.m_islandFlag = !1;
            for (var s = this.m_jointList; s; s = s.m_next) s.m_islandFlag = !1;
            for (var n = this.s_stack, r = this.m_bodyList; r; r = r.m_next)
                if (!r.m_islandFlag && r.IsAwake() && r.IsActive() && 0 !== r.GetType()) {
                    i.Clear();
                    var a = 0;
                    for (n[a++] = r, r.m_islandFlag = !0; a > 0;) {
                        e = n[--a];
                        if (i.AddBody(e), e.SetAwake(!0), 0 !== e.GetType()) {
                            for (var l = e.m_contactList; l; l = l.next) {
                                var m = l.contact;
                                if (!m.m_islandFlag && (m.IsEnabled() && m.IsTouching())) {
                                    var _ = m.m_fixtureA.m_isSensor,
                                        u = m.m_fixtureB.m_isSensor;
                                    if (!_ && !u) i.AddContact(m), m.m_islandFlag = !0, (p = l.other).m_islandFlag || (n[a++] = p, p.m_islandFlag = !0)
                                }
                            }
                            for (var c = e.m_jointList; c; c = c.next) {
                                var p;
                                if (!c.joint.m_islandFlag)(p = c.other).IsActive() && (i.AddJoint(c.joint), c.joint.m_islandFlag = !0, p.m_islandFlag || (n[a++] = p, p.m_islandFlag = !0))
                            }
                        }
                    }
                    var f = new ht;
                    i.Solve(f, t, this.m_gravity, this.m_allowSleep), this.m_profile.solveInit += f.solveInit, this.m_profile.solveVelocity += f.solveVelocity, this.m_profile.solvePosition += f.solvePosition;
                    for (var d = 0; d < i.m_bodyCount; ++d) {
                        0 === (e = i.m_bodies[d]).GetType() && (e.m_islandFlag = !1)
                    }
                }
            for (d = 0; d < n.length && n[d]; ++d) n[d] = null;
            var y = new h;
            for (e = this.m_bodyList; e; e = e.m_next) e.m_islandFlag && 0 !== e.GetType() && e.SynchronizeFixtures();
            this.m_contactManager.FindNewContacts(), this.m_profile.broadphase = y.GetMilliseconds()
        }, b2World.prototype.SolveTOI = function (e) {
            var i = this.m_island;
            if (i.Initialize(2 * t.b2_maxTOIContacts, t.b2_maxTOIContacts, 0, null, this.m_contactManager.m_contactListener), this.m_stepComplete) {
                for (var o = this.m_bodyList; o; o = o.m_next) o.m_islandFlag = !1, o.m_sweep.alpha0 = 0;
                for (var s = this.m_contactManager.m_contactList; s; s = s.m_next) s.m_toiFlag = !1, s.m_islandFlag = !1, s.m_toiCount = 0, s.m_toi = 1
            }
            for (;;) {
                var n = null,
                    r = 1;
                for (s = this.m_contactManager.m_contactList; s; s = s.m_next)
                    if (s.IsEnabled() && !(s.m_toiCount > t.b2_maxSubSteps)) {
                        var a = 1;
                        if (s.m_toiFlag) a = s.m_toi;
                        else {
                            var l = s.GetFixtureA(),
                                m = s.GetFixtureB();
                            if (l.IsSensor() || m.IsSensor()) continue;
                            var _ = l.GetBody(),
                                h = m.GetBody(),
                                u = _.m_type,
                                c = h.m_type,
                                p = _.IsAwake() && 0 !== u,
                                f = h.IsAwake() && 0 !== c;
                            if (!p && !f) continue;
                            var d = _.IsBullet() || 2 !== u,
                                y = h.IsBullet() || 2 !== c;
                            if (!d && !y) continue;
                            var b = _.m_sweep.alpha0;
                            _.m_sweep.alpha0 < h.m_sweep.alpha0 ? (b = h.m_sweep.alpha0, _.m_sweep.Advance(b)) : h.m_sweep.alpha0 < _.m_sweep.alpha0 && (b = _.m_sweep.alpha0, h.m_sweep.Advance(b));
                            var v = s.GetChildIndexA(),
                                S = s.GetChildIndexB(),
                                x = b2World.SolveTOI_s_toi_input;
                            x.proxyA.SetShape(l.GetShape(), v), x.proxyB.SetShape(m.GetShape(), S), x.sweepA.Copy(_.m_sweep), x.sweepB.Copy(h.m_sweep), x.tMax = 1;
                            var C = b2World.SolveTOI_s_toi_output;
                            b2TimeOfImpact(C, x);
                            var A = C.t;
                            a = 3 === C.state ? b2Min(b + (1 - b) * A, 1) : 1, s.m_toi = a, s.m_toiFlag = !0
                        }
                        a < r && (n = s, r = a)
                    }
                if (null === n || 1 - 10 * t.b2_epsilon < r) {
                    this.m_stepComplete = !0;
                    break
                }
                var B = n.GetFixtureA(),
                    V = n.GetFixtureB(),
                    g = B.GetBody(),
                    P = V.GetBody(),
                    w = b2World.SolveTOI_s_backup1.Copy(g.m_sweep),
                    M = b2World.SolveTOI_s_backup2.Copy(P.m_sweep);
                if (g.Advance(r), P.Advance(r), n.Update(this.m_contactManager.m_contactListener), n.m_toiFlag = !1, ++n.m_toiCount, n.IsEnabled() && n.IsTouching()) {
                    g.SetAwake(!0), P.SetAwake(!0), i.Clear(), i.AddBody(g), i.AddBody(P), i.AddContact(n), g.m_islandFlag = !0, P.m_islandFlag = !0, n.m_islandFlag = !0;
                    for (var I = 0; I < 2; ++I) {
                        if (2 === (k = 0 === I ? g : P).m_type)
                            for (var D = k.m_contactList; D && i.m_bodyCount !== i.m_bodyCapacity && i.m_contactCount !== i.m_contactCapacity; D = D.next) {
                                var G = D.contact;
                                if (!G.m_islandFlag) {
                                    var F = D.other;
                                    if (2 !== F.m_type || k.IsBullet() || F.IsBullet()) {
                                        var R = G.m_fixtureA.m_isSensor,
                                            J = G.m_fixtureB.m_isSensor;
                                        if (!R && !J) {
                                            var T = b2World.SolveTOI_s_backup.Copy(F.m_sweep);
                                            F.m_islandFlag || F.Advance(r), G.Update(this.m_contactManager.m_contactListener), G.IsEnabled() && G.IsTouching() ? (G.m_islandFlag = !0, i.AddContact(G), F.m_islandFlag || (F.m_islandFlag = !0, 0 !== F.m_type && F.SetAwake(!0), i.AddBody(F))) : (F.m_sweep.Copy(T), F.SynchronizeTransform())
                                        }
                                    }
                                }
                            }
                    }
                    var L = b2World.SolveTOI_s_subStep;
                    L.dt = (1 - r) * e.dt, L.inv_dt = 1 / L.dt, L.dtRatio = 1, L.positionIterations = 20, L.velocityIterations = e.velocityIterations, L.particleIterations = e.particleIterations, L.warmStarting = !1, i.SolveTOI(L, g.m_islandIndex, P.m_islandIndex);
                    for (I = 0; I < i.m_bodyCount; ++I) {
                        var k;
                        if ((k = i.m_bodies[I]).m_islandFlag = !1, 2 === k.m_type) {
                            k.SynchronizeFixtures();
                            for (D = k.m_contactList; D; D = D.next) D.contact.m_toiFlag = !1, D.contact.m_islandFlag = !1
                        }
                    }
                    if (this.m_contactManager.FindNewContacts(), this.m_subStepping) {
                        this.m_stepComplete = !1;
                        break
                    }
                } else n.SetEnabled(!1), g.m_sweep.Copy(w), P.m_sweep.Copy(M), g.SynchronizeTransform(), P.SynchronizeTransform()
            }
        }, b2World.Step_s_step = new ut, b2World.Step_s_stepTimer = new h, b2World.Step_s_timer = new h, b2World.DrawDebugData_s_color = new m(0, 0, 0), b2World.DrawDebugData_s_vs = i.MakeArray(4), b2World.DrawDebugData_s_xf = new a, b2World.QueryShape_s_aabb = new z, b2World.QueryPoint_s_aabb = new z, b2World.RayCast_s_input = new k, b2World.RayCast_s_output = new q, b2World.RayCast_s_point = new i, b2World.DrawJoint_s_p1 = new i, b2World.DrawJoint_s_p2 = new i, b2World.DrawJoint_s_color = new m(.5, .8, .8), b2World.SolveTOI_s_subStep = new ut, b2World.SolveTOI_s_backup = new l, b2World.SolveTOI_s_backup1 = new l, b2World.SolveTOI_s_backup2 = new l, b2World.SolveTOI_s_toi_input = new $, b2World.SolveTOI_s_toi_output = new tt, b2World
    }();
    t.b2World = ge;
    var Pe = function () {
        return function () {
            this.type = 0, this.position = new i(0, 0), this.angle = 0, this.linearVelocity = new i(0, 0), this.angularVelocity = 0, this.linearDamping = 0, this.angularDamping = 0, this.allowSleep = !0, this.awake = !0, this.fixedRotation = !1, this.bullet = !1, this.active = !0, this.userData = null, this.gravityScale = 1
        }
    }();
    t.b2BodyDef = Pe;
    var we = function () {
        function b2Body(t, e) {
            this.m_type = 0, this.m_islandFlag = !1, this.m_awakeFlag = !1, this.m_autoSleepFlag = !1, this.m_bulletFlag = !1, this.m_fixedRotationFlag = !1, this.m_activeFlag = !1, this.m_toiFlag = !1, this.m_islandIndex = 0, this.m_xf = new a, this.m_xf0 = new a, this.m_sweep = new l, this.m_linearVelocity = new i, this.m_angularVelocity = 0, this.m_force = new i, this.m_torque = 0, this.m_world = null, this.m_prev = null, this.m_next = null, this.m_fixtureList = null, this.m_fixtureCount = 0, this.m_jointList = null, this.m_contactList = null, this.m_mass = 1, this.m_invMass = 1, this.m_I = 0, this.m_invI = 0, this.m_linearDamping = 0, this.m_angularDamping = 0, this.m_gravityScale = 1, this.m_sleepTime = 0, this.m_userData = null, t.bullet && (this.m_bulletFlag = !0), t.fixedRotation && (this.m_fixedRotationFlag = !0), t.allowSleep && (this.m_autoSleepFlag = !0), t.awake && (this.m_awakeFlag = !0), t.active && (this.m_activeFlag = !0), this.m_world = e, this.m_xf.p.Copy(t.position), this.m_xf.q.SetAngle(t.angle), this.m_xf0.Copy(this.m_xf), this.m_sweep.localCenter.SetZero(), this.m_sweep.c0.Copy(this.m_xf.p), this.m_sweep.c.Copy(this.m_xf.p), this.m_sweep.a0 = t.angle, this.m_sweep.a = t.angle, this.m_sweep.alpha0 = 0, this.m_linearVelocity.Copy(t.linearVelocity), this.m_angularVelocity = t.angularVelocity, this.m_linearDamping = t.linearDamping, this.m_angularDamping = t.angularDamping, this.m_gravityScale = t.gravityScale, this.m_force.SetZero(), this.m_torque = 0, this.m_sleepTime = 0, this.m_type = t.type, 2 === t.type ? (this.m_mass = 1, this.m_invMass = 1) : (this.m_mass = 0, this.m_invMass = 0), this.m_I = 0, this.m_invI = 0, this.m_userData = t.userData, this.m_fixtureList = null, this.m_fixtureCount = 0
        }
        return b2Body.prototype.CreateFixture = function (t, e) {
            if (t instanceof xt) return this.CreateFixtureDef(t);
            if (t instanceof D && "number" == typeof e) return this.CreateFixtureShapeDensity(t, e);
            throw new Error
        }, b2Body.prototype.CreateFixtureDef = function (t) {
            if (this.m_world.IsLocked()) return null;
            var e = new At;
            if (e.Create(this, t), this.m_activeFlag) {
                var i = this.m_world.m_contactManager.m_broadPhase;
                e.CreateProxies(i, this.m_xf)
            }
            return e.m_next = this.m_fixtureList, this.m_fixtureList = e, ++this.m_fixtureCount, e.m_body = this, e.m_density > 0 && this.ResetMassData(), this.m_world.m_newFixture = !0, e
        }, b2Body.prototype.CreateFixtureShapeDensity = function (t, e) {
            void 0 === e && (e = 0);
            var i = b2Body.CreateFixtureShapeDensity_s_def;
            return i.shape = t, i.density = e, this.CreateFixtureDef(i)
        }, b2Body.prototype.DestroyFixture = function (t) {
            if (!this.m_world.IsLocked()) {
                for (var e = this.m_fixtureList, i = null; null !== e;) {
                    if (e === t) {
                        i ? i.m_next = t.m_next : this.m_fixtureList = t.m_next, !0;
                        break
                    }
                    i = e, e = e.m_next
                }
                for (var o = this.m_contactList; o;) {
                    var s = o.contact;
                    o = o.next;
                    var n = s.GetFixtureA(),
                        r = s.GetFixtureB();
                    t !== n && t !== r || this.m_world.m_contactManager.Destroy(s)
                }
                if (this.m_activeFlag) {
                    var a = this.m_world.m_contactManager.m_broadPhase;
                    t.DestroyProxies(a)
                }
                t.Destroy(), t.m_body = null, t.m_next = null, --this.m_fixtureCount, this.ResetMassData()
            }
        }, b2Body.prototype.SetTransformVec = function (t, e) {
            this.SetTransformXY(t.x, t.y, e)
        }, b2Body.prototype.SetTransformXY = function (t, e, i) {
            if (!this.m_world.IsLocked()) {
                this.m_xf.q.SetAngle(i), this.m_xf.p.Set(t, e), this.m_xf0.Copy(this.m_xf), a.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.a = i, this.m_sweep.c0.Copy(this.m_sweep.c), this.m_sweep.a0 = i;
                for (var o = this.m_world.m_contactManager.m_broadPhase, s = this.m_fixtureList; s; s = s.m_next) s.Synchronize(o, this.m_xf, this.m_xf);
                this.m_world.m_contactManager.FindNewContacts()
            }
        }, b2Body.prototype.SetTransform = function (t) {
            this.SetTransformVec(t.p, t.GetAngle())
        }, b2Body.prototype.GetTransform = function () {
            return this.m_xf
        }, b2Body.prototype.GetPosition = function () {
            return this.m_xf.p
        }, b2Body.prototype.SetPosition = function (t) {
            this.SetTransformVec(t, this.GetAngle())
        }, b2Body.prototype.SetPositionXY = function (t, e) {
            this.SetTransformXY(t, e, this.GetAngle())
        }, b2Body.prototype.GetAngle = function () {
            return this.m_sweep.a
        }, b2Body.prototype.SetAngle = function (t) {
            this.SetTransformVec(this.GetPosition(), t)
        }, b2Body.prototype.GetWorldCenter = function () {
            return this.m_sweep.c
        }, b2Body.prototype.GetLocalCenter = function () {
            return this.m_sweep.localCenter
        }, b2Body.prototype.SetLinearVelocity = function (t) {
            0 !== this.m_type && (i.DotVV(t, t) > 0 && this.SetAwake(!0), this.m_linearVelocity.Copy(t))
        }, b2Body.prototype.GetLinearVelocity = function () {
            return this.m_linearVelocity
        }, b2Body.prototype.SetAngularVelocity = function (t) {
            0 !== this.m_type && (t * t > 0 && this.SetAwake(!0), this.m_angularVelocity = t)
        }, b2Body.prototype.GetAngularVelocity = function () {
            return this.m_angularVelocity
        }, b2Body.prototype.GetDefinition = function (t) {
            return t.type = this.GetType(), t.allowSleep = this.m_autoSleepFlag, t.angle = this.GetAngle(), t.angularDamping = this.m_angularDamping, t.gravityScale = this.m_gravityScale, t.angularVelocity = this.m_angularVelocity, t.fixedRotation = this.m_fixedRotationFlag, t.bullet = this.m_bulletFlag, t.awake = this.m_awakeFlag, t.linearDamping = this.m_linearDamping, t.linearVelocity.Copy(this.GetLinearVelocity()), t.position.Copy(this.GetPosition()), t.userData = this.GetUserData(), t
        }, b2Body.prototype.ApplyForce = function (t, e, i) {
            void 0 === i && (i = !0), 2 === this.m_type && (i && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_force.x += t.x, this.m_force.y += t.y, this.m_torque += (e.x - this.m_sweep.c.x) * t.y - (e.y - this.m_sweep.c.y) * t.x))
        }, b2Body.prototype.ApplyForceToCenter = function (t, e) {
            void 0 === e && (e = !0), 2 === this.m_type && (e && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_force.x += t.x, this.m_force.y += t.y))
        }, b2Body.prototype.ApplyTorque = function (t, e) {
            void 0 === e && (e = !0), 2 === this.m_type && (e && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_torque += t))
        }, b2Body.prototype.ApplyLinearImpulse = function (t, e, i) {
            void 0 === i && (i = !0), 2 === this.m_type && (i && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_linearVelocity.x += this.m_invMass * t.x, this.m_linearVelocity.y += this.m_invMass * t.y, this.m_angularVelocity += this.m_invI * ((e.x - this.m_sweep.c.x) * t.y - (e.y - this.m_sweep.c.y) * t.x)))
        }, b2Body.prototype.ApplyLinearImpulseToCenter = function (t, e) {
            void 0 === e && (e = !0), 2 === this.m_type && (e && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_linearVelocity.x += this.m_invMass * t.x, this.m_linearVelocity.y += this.m_invMass * t.y))
        }, b2Body.prototype.ApplyAngularImpulse = function (t, e) {
            void 0 === e && (e = !0), 2 === this.m_type && (e && !this.m_awakeFlag && this.SetAwake(!0), this.m_awakeFlag && (this.m_angularVelocity += this.m_invI * t))
        }, b2Body.prototype.GetMass = function () {
            return this.m_mass
        }, b2Body.prototype.GetInertia = function () {
            return this.m_I + this.m_mass * i.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter)
        }, b2Body.prototype.GetMassData = function (t) {
            return t.mass = this.m_mass, t.I = this.m_I + this.m_mass * i.DotVV(this.m_sweep.localCenter, this.m_sweep.localCenter), t.center.Copy(this.m_sweep.localCenter), t
        }, b2Body.prototype.SetMassData = function (t) {
            if (!this.m_world.IsLocked() && 2 === this.m_type) {
                this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_mass = t.mass, this.m_mass <= 0 && (this.m_mass = 1), this.m_invMass = 1 / this.m_mass, t.I > 0 && !this.m_fixedRotationFlag && (this.m_I = t.I - this.m_mass * i.DotVV(t.center, t.center), this.m_invI = 1 / this.m_I);
                var e = b2Body.SetMassData_s_oldCenter.Copy(this.m_sweep.c);
                this.m_sweep.localCenter.Copy(t.center), a.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.c0.Copy(this.m_sweep.c), i.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, i.SubVV(this.m_sweep.c, e, i.s_t0), this.m_linearVelocity)
            }
        }, b2Body.prototype.ResetMassData = function () {
            if (this.m_mass = 0, this.m_invMass = 0, this.m_I = 0, this.m_invI = 0, this.m_sweep.localCenter.SetZero(), 0 === this.m_type || 1 === this.m_type) return this.m_sweep.c0.Copy(this.m_xf.p), this.m_sweep.c.Copy(this.m_xf.p), void(this.m_sweep.a0 = this.m_sweep.a);
            for (var t = b2Body.ResetMassData_s_localCenter.SetZero(), e = this.m_fixtureList; e; e = e.m_next)
                if (0 !== e.m_density) {
                    var o = e.GetMassData(b2Body.ResetMassData_s_massData);
                    this.m_mass += o.mass, t.x += o.center.x * o.mass, t.y += o.center.y * o.mass, this.m_I += o.I
                }
            this.m_mass > 0 ? (this.m_invMass = 1 / this.m_mass, t.x *= this.m_invMass, t.y *= this.m_invMass) : (this.m_mass = 1, this.m_invMass = 1), this.m_I > 0 && !this.m_fixedRotationFlag ? (this.m_I -= this.m_mass * i.DotVV(t, t), this.m_invI = 1 / this.m_I) : (this.m_I = 0, this.m_invI = 0);
            var s = b2Body.ResetMassData_s_oldCenter.Copy(this.m_sweep.c);
            this.m_sweep.localCenter.Copy(t), a.MulXV(this.m_xf, this.m_sweep.localCenter, this.m_sweep.c), this.m_sweep.c0.Copy(this.m_sweep.c), i.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, i.SubVV(this.m_sweep.c, s, i.s_t0), this.m_linearVelocity)
        }, b2Body.prototype.GetWorldPoint = function (t, e) {
            return a.MulXV(this.m_xf, t, e)
        }, b2Body.prototype.GetWorldVector = function (t, e) {
            return r.MulRV(this.m_xf.q, t, e)
        }, b2Body.prototype.GetLocalPoint = function (t, e) {
            return a.MulTXV(this.m_xf, t, e)
        }, b2Body.prototype.GetLocalVector = function (t, e) {
            return r.MulTRV(this.m_xf.q, t, e)
        }, b2Body.prototype.GetLinearVelocityFromWorldPoint = function (t, e) {
            return i.AddVCrossSV(this.m_linearVelocity, this.m_angularVelocity, i.SubVV(t, this.m_sweep.c, i.s_t0), e)
        }, b2Body.prototype.GetLinearVelocityFromLocalPoint = function (t, e) {
            return this.GetLinearVelocityFromWorldPoint(this.GetWorldPoint(t, e), e)
        }, b2Body.prototype.GetLinearDamping = function () {
            return this.m_linearDamping
        }, b2Body.prototype.SetLinearDamping = function (t) {
            this.m_linearDamping = t
        }, b2Body.prototype.GetAngularDamping = function () {
            return this.m_angularDamping
        }, b2Body.prototype.SetAngularDamping = function (t) {
            this.m_angularDamping = t
        }, b2Body.prototype.GetGravityScale = function () {
            return this.m_gravityScale
        }, b2Body.prototype.SetGravityScale = function (t) {
            this.m_gravityScale = t
        }, b2Body.prototype.SetType = function (t) {
            if (!this.m_world.IsLocked() && this.m_type !== t) {
                this.m_type = t, this.ResetMassData(), 0 === this.m_type && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_sweep.a0 = this.m_sweep.a, this.m_sweep.c0.Copy(this.m_sweep.c), this.SynchronizeFixtures()), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0;
                for (var e = this.m_contactList; e;) {
                    var i = e;
                    e = e.next, this.m_world.m_contactManager.Destroy(i.contact)
                }
                this.m_contactList = null;
                for (var o = this.m_world.m_contactManager.m_broadPhase, s = this.m_fixtureList; s; s = s.m_next)
                    for (var n = s.m_proxyCount, r = 0; r < n; ++r) o.TouchProxy(s.m_proxies[r].proxy)
            }
        }, b2Body.prototype.GetType = function () {
            return this.m_type
        }, b2Body.prototype.SetBullet = function (t) {
            this.m_bulletFlag = t
        }, b2Body.prototype.IsBullet = function () {
            return this.m_bulletFlag
        }, b2Body.prototype.SetSleepingAllowed = function (t) {
            this.m_autoSleepFlag = t, t || this.SetAwake(!0)
        }, b2Body.prototype.IsSleepingAllowed = function () {
            return this.m_autoSleepFlag
        }, b2Body.prototype.SetAwake = function (t) {
            t ? this.m_awakeFlag || (this.m_awakeFlag = !0, this.m_sleepTime = 0) : (this.m_awakeFlag = !1, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
        }, b2Body.prototype.IsAwake = function () {
            return this.m_awakeFlag
        }, b2Body.prototype.SetActive = function (t) {
            if (t !== this.IsActive())
                if (this.m_activeFlag = t, t)
                    for (var e = this.m_world.m_contactManager.m_broadPhase, i = this.m_fixtureList; i; i = i.m_next) i.CreateProxies(e, this.m_xf);
                else {
                    for (e = this.m_world.m_contactManager.m_broadPhase, i = this.m_fixtureList; i; i = i.m_next) i.DestroyProxies(e);
                    for (var o = this.m_contactList; o;) {
                        var s = o;
                        o = o.next, this.m_world.m_contactManager.Destroy(s.contact)
                    }
                    this.m_contactList = null
                }
        }, b2Body.prototype.IsActive = function () {
            return this.m_activeFlag
        }, b2Body.prototype.SetFixedRotation = function (t) {
            this.m_fixedRotationFlag !== t && (this.m_fixedRotationFlag = t, this.m_angularVelocity = 0, this.ResetMassData())
        }, b2Body.prototype.IsFixedRotation = function () {
            return this.m_fixedRotationFlag
        }, b2Body.prototype.GetFixtureList = function () {
            return this.m_fixtureList
        }, b2Body.prototype.GetJointList = function () {
            return this.m_jointList
        }, b2Body.prototype.GetContactList = function () {
            return this.m_contactList
        }, b2Body.prototype.GetNext = function () {
            return this.m_next
        }, b2Body.prototype.GetUserData = function () {
            return this.m_userData
        }, b2Body.prototype.SetUserData = function (t) {
            this.m_userData = t
        }, b2Body.prototype.GetWorld = function () {
            return this.m_world
        }, b2Body.prototype.Dump = function (t) {
            var e = this.m_islandIndex;
            t("{\n"), t("  const bd: b2BodyDef = new b2BodyDef();\n");
            var i = "";
            switch (this.m_type) {
            case 0:
                i = "b2BodyType.b2_staticBody";
                break;
            case 1:
                i = "b2BodyType.b2_kinematicBody";
                break;
            case 2:
                i = "b2BodyType.b2_dynamicBody"
            }
            t("  bd.type = %s;\n", i), t("  bd.position.Set(%.15f, %.15f);\n", this.m_xf.p.x, this.m_xf.p.y), t("  bd.angle = %.15f;\n", this.m_sweep.a), t("  bd.linearVelocity.Set(%.15f, %.15f);\n", this.m_linearVelocity.x, this.m_linearVelocity.y), t("  bd.angularVelocity = %.15f;\n", this.m_angularVelocity), t("  bd.linearDamping = %.15f;\n", this.m_linearDamping), t("  bd.angularDamping = %.15f;\n", this.m_angularDamping), t("  bd.allowSleep = %s;\n", this.m_autoSleepFlag ? "true" : "false"), t("  bd.awake = %s;\n", this.m_awakeFlag ? "true" : "false"), t("  bd.fixedRotation = %s;\n", this.m_fixedRotationFlag ? "true" : "false"), t("  bd.bullet = %s;\n", this.m_bulletFlag ? "true" : "false"), t("  bd.active = %s;\n", this.m_activeFlag ? "true" : "false"), t("  bd.gravityScale = %.15f;\n", this.m_gravityScale), t("\n"), t("  bodies[%d] = this.m_world.CreateBody(bd);\n", this.m_islandIndex), t("\n");
            for (var o = this.m_fixtureList; o; o = o.m_next) t("  {\n"), o.Dump(t, e), t("  }\n");
            t("}\n")
        }, b2Body.prototype.SynchronizeFixtures = function () {
            var t = b2Body.SynchronizeFixtures_s_xf1;
            t.q.SetAngle(this.m_sweep.a0), r.MulRV(t.q, this.m_sweep.localCenter, t.p), i.SubVV(this.m_sweep.c0, t.p, t.p);
            for (var e = this.m_world.m_contactManager.m_broadPhase, o = this.m_fixtureList; o; o = o.m_next) o.Synchronize(e, t, this.m_xf)
        }, b2Body.prototype.SynchronizeTransform = function () {
            this.m_xf.q.SetAngle(this.m_sweep.a), r.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p), i.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p)
        }, b2Body.prototype.ShouldCollide = function (t) {
            return (0 !== this.m_type || 0 !== t.m_type) && this.ShouldCollideConnected(t)
        }, b2Body.prototype.ShouldCollideConnected = function (t) {
            for (var e = this.m_jointList; e; e = e.next)
                if (e.other === t && !e.joint.m_collideConnected) return !1;
            return !0
        }, b2Body.prototype.Advance = function (t) {
            this.m_sweep.Advance(t), this.m_sweep.c.Copy(this.m_sweep.c0), this.m_sweep.a = this.m_sweep.a0, this.m_xf.q.SetAngle(this.m_sweep.a), r.MulRV(this.m_xf.q, this.m_sweep.localCenter, this.m_xf.p), i.SubVV(this.m_sweep.c, this.m_xf.p, this.m_xf.p)
        }, b2Body.CreateFixtureShapeDensity_s_def = new xt, b2Body.SetMassData_s_oldCenter = new i, b2Body.ResetMassData_s_localCenter = new i, b2Body.ResetMassData_s_oldCenter = new i, b2Body.ResetMassData_s_massData = new I, b2Body.SynchronizeFixtures_s_xf1 = new a, b2Body
    }();

    function b2MixFriction(t, e) {
        return b2Sqrt(t * e)
    }

    function b2MixRestitution(t, e) {
        return t > e ? t : e
    }
    t.b2Body = we, t.b2MixFriction = b2MixFriction, t.b2MixRestitution = b2MixRestitution;
    var Me = function () {
        return function () {
            this.other = null, this.contact = null, this.prev = null, this.next = null
        }
    }();
    t.b2ContactEdge = Me;
    var Ie = function () {
        function b2Contact() {
            this.m_islandFlag = !1, this.m_touchingFlag = !1, this.m_enabledFlag = !1, this.m_filterFlag = !1, this.m_bulletHitFlag = !1, this.m_toiFlag = !1, this.m_prev = null, this.m_next = null, this.m_nodeA = new Me, this.m_nodeB = new Me, this.m_fixtureA = null, this.m_fixtureB = null, this.m_indexA = 0, this.m_indexB = 0, this.m_manifold = new J, this.m_toiCount = 0, this.m_toi = 0, this.m_friction = 0, this.m_restitution = 0, this.m_tangentSpeed = 0, this.m_oldManifold = new J
        }
        return b2Contact.prototype.GetManifold = function () {
            return this.m_manifold
        }, b2Contact.prototype.GetWorldManifold = function (t) {
            var e = this.m_fixtureA.GetBody(),
                i = this.m_fixtureB.GetBody(),
                o = this.m_fixtureA.GetShape(),
                s = this.m_fixtureB.GetShape();
            t.Initialize(this.m_manifold, e.GetTransform(), o.m_radius, i.GetTransform(), s.m_radius)
        }, b2Contact.prototype.IsTouching = function () {
            return this.m_touchingFlag
        }, b2Contact.prototype.SetEnabled = function (t) {
            this.m_enabledFlag = t
        }, b2Contact.prototype.IsEnabled = function () {
            return this.m_enabledFlag
        }, b2Contact.prototype.GetNext = function () {
            return this.m_next
        }, b2Contact.prototype.GetFixtureA = function () {
            return this.m_fixtureA
        }, b2Contact.prototype.GetChildIndexA = function () {
            return this.m_indexA
        }, b2Contact.prototype.GetFixtureB = function () {
            return this.m_fixtureB
        }, b2Contact.prototype.GetChildIndexB = function () {
            return this.m_indexB
        }, b2Contact.prototype.Evaluate = function (t, e, i) {}, b2Contact.prototype.FlagForFiltering = function () {
            this.m_filterFlag = !0
        }, b2Contact.prototype.SetFriction = function (t) {
            this.m_friction = t
        }, b2Contact.prototype.GetFriction = function () {
            return this.m_friction
        }, b2Contact.prototype.ResetFriction = function () {
            this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction)
        }, b2Contact.prototype.SetRestitution = function (t) {
            this.m_restitution = t
        }, b2Contact.prototype.GetRestitution = function () {
            return this.m_restitution
        }, b2Contact.prototype.ResetRestitution = function () {
            this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution)
        }, b2Contact.prototype.SetTangentSpeed = function (t) {
            this.m_tangentSpeed = t
        }, b2Contact.prototype.GetTangentSpeed = function () {
            return this.m_tangentSpeed
        }, b2Contact.prototype.Reset = function (t, e, i, o) {
            this.m_islandFlag = !1, this.m_touchingFlag = !1, this.m_enabledFlag = !0, this.m_filterFlag = !1, this.m_bulletHitFlag = !1, this.m_toiFlag = !1, this.m_fixtureA = t, this.m_fixtureB = i, this.m_indexA = e, this.m_indexB = o, this.m_manifold.pointCount = 0, this.m_prev = null, this.m_next = null, this.m_nodeA.contact = null, this.m_nodeA.prev = null, this.m_nodeA.next = null, this.m_nodeA.other = null, this.m_nodeB.contact = null, this.m_nodeB.prev = null, this.m_nodeB.next = null, this.m_nodeB.other = null, this.m_toiCount = 0, this.m_friction = b2MixFriction(this.m_fixtureA.m_friction, this.m_fixtureB.m_friction), this.m_restitution = b2MixRestitution(this.m_fixtureA.m_restitution, this.m_fixtureB.m_restitution)
        }, b2Contact.prototype.Update = function (t) {
            var e = this.m_oldManifold;
            this.m_oldManifold = this.m_manifold, this.m_manifold = e, this.m_enabledFlag = !0;
            var i = !1,
                o = this.m_touchingFlag,
                s = this.m_fixtureA.IsSensor(),
                n = this.m_fixtureB.IsSensor(),
                r = s || n,
                a = this.m_fixtureA.GetBody(),
                l = this.m_fixtureB.GetBody(),
                m = a.GetTransform(),
                _ = l.GetTransform();
            if (r) {
                var h = this.m_fixtureA.GetShape(),
                    u = this.m_fixtureB.GetShape();
                i = b2TestOverlapShape(h, this.m_indexA, u, this.m_indexB, m, _), this.m_manifold.pointCount = 0
            } else {
                this.Evaluate(this.m_manifold, m, _), i = this.m_manifold.pointCount > 0;
                for (var c = 0; c < this.m_manifold.pointCount; ++c) {
                    var p = this.m_manifold.points[c];
                    p.normalImpulse = 0, p.tangentImpulse = 0;
                    for (var f = p.id, d = 0; d < this.m_oldManifold.pointCount; ++d) {
                        var y = this.m_oldManifold.points[d];
                        if (y.id.key === f.key) {
                            p.normalImpulse = y.normalImpulse, p.tangentImpulse = y.tangentImpulse;
                            break
                        }
                    }
                }
                i !== o && (a.SetAwake(!0), l.SetAwake(!0))
            }
            this.m_touchingFlag = i, !o && i && t && t.BeginContact(this), o && !i && t && t.EndContact(this), !r && i && t && t.PreSolve(this, this.m_oldManifold)
        }, b2Contact.prototype.ComputeTOI = function (e, i) {
            var o = b2Contact.ComputeTOI_s_input;
            o.proxyA.SetShape(this.m_fixtureA.GetShape(), this.m_indexA), o.proxyB.SetShape(this.m_fixtureB.GetShape(), this.m_indexB), o.sweepA.Copy(e), o.sweepB.Copy(i), o.tMax = t.b2_linearSlop;
            var s = b2Contact.ComputeTOI_s_output;
            return b2TimeOfImpact(s, o), s.t
        }, b2Contact.ComputeTOI_s_input = new $, b2Contact.ComputeTOI_s_output = new tt, b2Contact
    }();
    t.b2Contact = Ie;
    var De = new i,
        Ge = new i;

    function b2CollideCircles(t, e, o, s, n) {
        t.pointCount = 0;
        var r = a.MulXV(o, e.m_p, De),
            l = a.MulXV(n, s.m_p, Ge),
            m = i.DistanceSquaredVV(r, l),
            _ = e.m_radius + s.m_radius;
        m > _ * _ || (t.type = 0, t.localPoint.Copy(e.m_p), t.localNormal.SetZero(), t.pointCount = 1, t.points[0].localPoint.Copy(s.m_p), t.points[0].id.key = 0)
    }
    t.b2CollideCircles = b2CollideCircles;
    var Fe = new i,
        Re = new i,
        Je = new i;

    function b2CollidePolygonAndCircle(e, o, s, n, r) {
        e.pointCount = 0;
        for (var l = a.MulXV(r, n.m_p, Fe), m = a.MulTXV(s, l, Re), _ = 0, h = -t.b2_maxFloat, u = o.m_radius + n.m_radius, c = o.m_count, p = o.m_vertices, f = o.m_normals, d = 0; d < c; ++d) {
            var y = i.DotVV(f[d], i.SubVV(m, p[d], i.s_t0));
            if (y > u) return;
            y > h && (h = y, _ = d)
        }
        var b = _,
            v = (b + 1) % c,
            S = p[b],
            x = p[v];
        if (h < t.b2_epsilon) return e.pointCount = 1, e.type = 1, e.localNormal.Copy(f[_]), i.MidVV(S, x, e.localPoint), e.points[0].localPoint.Copy(n.m_p), void(e.points[0].id.key = 0);
        var C = i.DotVV(i.SubVV(m, S, i.s_t0), i.SubVV(x, S, i.s_t1)),
            A = i.DotVV(i.SubVV(m, x, i.s_t0), i.SubVV(S, x, i.s_t1));
        if (C <= 0) {
            if (i.DistanceSquaredVV(m, S) > u * u) return;
            e.pointCount = 1, e.type = 1, i.SubVV(m, S, e.localNormal).SelfNormalize(), e.localPoint.Copy(S), e.points[0].localPoint.Copy(n.m_p), e.points[0].id.key = 0
        } else if (A <= 0) {
            if (i.DistanceSquaredVV(m, x) > u * u) return;
            e.pointCount = 1, e.type = 1, i.SubVV(m, x, e.localNormal).SelfNormalize(), e.localPoint.Copy(x), e.points[0].localPoint.Copy(n.m_p), e.points[0].id.key = 0
        } else {
            var B = i.MidVV(S, x, Je);
            if ((h = i.DotVV(i.SubVV(m, B, i.s_t1), f[b])) > u) return;
            e.pointCount = 1, e.type = 1, e.localNormal.Copy(f[b]).SelfNormalize(), e.localPoint.Copy(B), e.points[0].localPoint.Copy(n.m_p), e.points[0].id.key = 0
        }
    }
    t.b2CollidePolygonAndCircle = b2CollidePolygonAndCircle;
    var Te = function (t) {
        function b2CircleContact() {
            return t.call(this) || this
        }
        return __extends(b2CircleContact, t), b2CircleContact.Create = function (t) {
            return new b2CircleContact
        }, b2CircleContact.Destroy = function (t, e) {}, b2CircleContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2CircleContact.prototype.Evaluate = function (t, e, i) {
            b2CollideCircles(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i)
        }, b2CircleContact
    }(Ie);
    t.b2CircleContact = Te;
    var Le = new i,
        ke = new i,
        qe = new i,
        ze = new i;

    function b2EdgeSeparation(e, o, s, n, l) {
        for (var m = e.m_vertices, _ = e.m_normals, h = n.m_count, u = n.m_vertices, c = r.MulRV(o.q, _[s], Le), p = r.MulTRV(l.q, c, ke), f = 0, d = t.b2_maxFloat, y = 0; y < h; ++y) {
            var b = i.DotVV(u[y], p);
            b < d && (d = b, f = y)
        }
        var v = a.MulXV(o, m[s], qe),
            S = a.MulXV(l, u[f], ze);
        return i.DotVV(i.SubVV(S, v, i.s_t0), c)
    }
    var We = new i,
        Ee = new i;

    function b2FindMaxSeparation(e, o, s, n, l) {
        for (var m = o.m_count, _ = o.m_normals, h = i.SubVV(a.MulXV(l, n.m_centroid, i.s_t0), a.MulXV(s, o.m_centroid, i.s_t1), We), u = r.MulTRV(s.q, h, Ee), c = 0, p = -t.b2_maxFloat, f = 0; f < m; ++f) {
            var d = i.DotVV(_[f], u);
            d > p && (p = d, c = f)
        }
        var y = b2EdgeSeparation(o, s, c, n, l),
            b = (c + m - 1) % m,
            v = b2EdgeSeparation(o, s, b, n, l),
            S = (c + 1) % m,
            x = b2EdgeSeparation(o, s, S, n, l),
            C = 0,
            A = 0,
            B = 0;
        if (v > y && v > x) B = -1, C = b, A = v;
        else {
            if (!(x > y)) return e[0] = c, y;
            B = 1, C = S, A = x
        }
        for (;
            (y = b2EdgeSeparation(o, s, c = -1 === B ? (C + m - 1) % m : (C + 1) % m, n, l)) > A;) C = c, A = y;
        return e[0] = C, A
    }
    var je = new i;
    var Ne = L.MakeArray(2),
        Oe = L.MakeArray(2),
        Xe = L.MakeArray(2),
        Ue = [0],
        Ze = [0],
        He = new i,
        Qe = new i,
        Ye = new i,
        Ke = new i,
        $e = new i,
        ti = new i,
        ei = new i,
        ii = new i;

    function b2CollidePolygons(e, o, s, n, l) {
        e.pointCount = 0;
        var m = o.m_radius + n.m_radius,
            _ = Ue;
        _[0] = 0;
        var h = b2FindMaxSeparation(_, o, s, n, l);
        if (!(h > m)) {
            var u = Ze;
            u[0] = 0;
            var c = b2FindMaxSeparation(u, n, l, o, s);
            if (!(c > m)) {
                var p, f, d, y, b = 0,
                    v = 0;
                c > .98 * h + .001 ? (p = n, f = o, d = l, y = s, b = u[0], e.type = 2, v = 1) : (p = o, f = n, d = s, y = l, b = _[0], e.type = 1, v = 0);
                var S = Ne;
                ! function (e, o, s, n, l, m) {
                    for (var _ = o.m_normals, h = l.m_count, u = l.m_vertices, c = l.m_normals, p = r.MulTRV(m.q, r.MulRV(s.q, _[n], i.s_t0), je), f = 0, d = t.b2_maxFloat, y = 0; y < h; ++y) {
                        var b = i.DotVV(p, c[y]);
                        b < d && (d = b, f = y)
                    }
                    var v = f,
                        S = (v + 1) % h,
                        x = e[0];
                    a.MulXV(m, u[v], x.v);
                    var C = x.id.cf;
                    C.indexA = n, C.indexB = v, C.typeA = 1, C.typeB = 0;
                    var A = e[1];
                    a.MulXV(m, u[S], A.v);
                    var B = A.id.cf;
                    B.indexA = n, B.indexB = S, B.typeA = 1, B.typeB = 0
                }(S, p, d, b, f, y);
                var x = p.m_count,
                    C = p.m_vertices,
                    A = b,
                    B = (b + 1) % x,
                    V = C[A],
                    g = C[B],
                    P = i.SubVV(g, V, He);
                P.Normalize();
                var w = i.CrossVOne(P, Qe),
                    M = i.MidVV(V, g, Ye),
                    I = r.MulRV(d.q, P, $e),
                    D = i.CrossVOne(I, Ke),
                    G = a.MulXV(d, V, ei),
                    F = a.MulXV(d, g, ii),
                    R = i.DotVV(D, G),
                    J = -i.DotVV(I, G) + m,
                    T = i.DotVV(I, F) + m,
                    L = Oe,
                    k = Xe;
                if (!(b2ClipSegmentToLine(L, S, i.NegV(I, ti), J, A) < 2 || b2ClipSegmentToLine(k, L, I, T, B) < 2)) {
                    e.localNormal.Copy(w), e.localPoint.Copy(M);
                    for (var q = 0, z = 0; z < t.b2_maxManifoldPoints; ++z) {
                        var W = k[z];
                        if (i.DotVV(D, W.v) - R <= m) {
                            var E = e.points[q];
                            if (a.MulTXV(y, W.v, E.localPoint), E.id.Copy(W.id), v) {
                                var j = E.id.cf;
                                E.id.cf.indexA = j.indexB, E.id.cf.indexB = j.indexA, E.id.cf.typeA = j.typeB, E.id.cf.typeB = j.typeA
                            }++q
                        }
                    }
                    e.pointCount = q
                }
            }
        }
    }
    t.b2CollidePolygons = b2CollidePolygons;
    var oi = function (t) {
        function b2PolygonContact() {
            return t.call(this) || this
        }
        return __extends(b2PolygonContact, t), b2PolygonContact.Create = function (t) {
            return new b2PolygonContact
        }, b2PolygonContact.Destroy = function (t, e) {}, b2PolygonContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2PolygonContact.prototype.Evaluate = function (t, e, i) {
            b2CollidePolygons(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i)
        }, b2PolygonContact
    }(Ie);
    t.b2PolygonContact = oi;
    var si = function (t) {
        function b2PolygonAndCircleContact() {
            return t.call(this) || this
        }
        return __extends(b2PolygonAndCircleContact, t), b2PolygonAndCircleContact.Create = function (t) {
            return new b2PolygonAndCircleContact
        }, b2PolygonAndCircleContact.Destroy = function (t, e) {}, b2PolygonAndCircleContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2PolygonAndCircleContact.prototype.Evaluate = function (t, e, i) {
            b2CollidePolygonAndCircle(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i)
        }, b2PolygonAndCircleContact
    }(Ie);
    t.b2PolygonAndCircleContact = si;
    var ni = new i,
        ri = new i,
        ai = new i,
        li = new i,
        mi = new i,
        _i = new i,
        hi = new i,
        ui = new F;

    function b2CollideEdgeAndCircle(t, e, o, s, n) {
        t.pointCount = 0;
        var r = a.MulTXV(o, a.MulXV(n, s.m_p, i.s_t0), ni),
            l = e.m_vertex1,
            m = e.m_vertex2,
            _ = i.SubVV(m, l, ri),
            h = i.DotVV(_, i.SubVV(m, r, i.s_t0)),
            u = i.DotVV(_, i.SubVV(r, l, i.s_t0)),
            c = e.m_radius + s.m_radius,
            p = ui;
        if (p.cf.indexB = 0, p.cf.typeB = 0, u <= 0) {
            var f = l,
                d = i.SubVV(r, f, ai);
            if (i.DotVV(d, d) > c * c) return;
            if (e.m_hasVertex0) {
                var y = e.m_vertex0,
                    b = l,
                    v = i.SubVV(b, y, li);
                if (i.DotVV(v, i.SubVV(b, r, i.s_t0)) > 0) return
            }
            return p.cf.indexA = 0, p.cf.typeA = 0, t.pointCount = 1, t.type = 0, t.localNormal.SetZero(), t.localPoint.Copy(f), t.points[0].id.Copy(p), void t.points[0].localPoint.Copy(s.m_p)
        }
        if (h <= 0) {
            var S = m,
                x = i.SubVV(r, S, ai);
            if (i.DotVV(x, x) > c * c) return;
            if (e.m_hasVertex3) {
                var C = e.m_vertex3,
                    A = m,
                    B = i.SubVV(C, A, mi);
                if (i.DotVV(B, i.SubVV(r, A, i.s_t0)) > 0) return
            }
            return p.cf.indexA = 1, p.cf.typeA = 0, t.pointCount = 1, t.type = 0, t.localNormal.SetZero(), t.localPoint.Copy(S), t.points[0].id.Copy(p), void t.points[0].localPoint.Copy(s.m_p)
        }
        var V = i.DotVV(_, _),
            g = _i;
        g.x = 1 / V * (h * l.x + u * m.x), g.y = 1 / V * (h * l.y + u * m.y);
        var P = i.SubVV(r, g, ai);
        if (!(i.DotVV(P, P) > c * c)) {
            var w = hi.Set(-_.y, _.x);
            i.DotVV(w, i.SubVV(r, l, i.s_t0)) < 0 && w.Set(-w.x, -w.y), w.Normalize(), p.cf.indexA = 0, p.cf.typeA = 1, t.pointCount = 1, t.type = 1, t.localNormal.Copy(w), t.localPoint.Copy(l), t.points[0].id.Copy(p), t.points[0].localPoint.Copy(s.m_p)
        }
    }
    t.b2CollideEdgeAndCircle = b2CollideEdgeAndCircle;
    var ci = function () {
            return function () {
                this.type = 0, this.index = 0, this.separation = 0
            }
        }(),
        pi = function () {
            return function () {
                this.vertices = i.MakeArray(t.b2_maxPolygonVertices), this.normals = i.MakeArray(t.b2_maxPolygonVertices), this.count = 0
            }
        }(),
        fi = function () {
            return function () {
                this.i1 = 0, this.i2 = 0, this.v1 = new i, this.v2 = new i, this.normal = new i, this.sideNormal1 = new i, this.sideOffset1 = 0, this.sideNormal2 = new i, this.sideOffset2 = 0
            }
        }(),
        di = new(function () {
            function b2EPCollider() {
                this.m_polygonB = new pi, this.m_xf = new a, this.m_centroidB = new i, this.m_v0 = new i, this.m_v1 = new i, this.m_v2 = new i, this.m_v3 = new i, this.m_normal0 = new i, this.m_normal1 = new i, this.m_normal2 = new i, this.m_normal = new i, this.m_type1 = 0, this.m_type2 = 0, this.m_lowerLimit = new i, this.m_upperLimit = new i, this.m_radius = 0, this.m_front = !1
            }
            return b2EPCollider.prototype.Collide = function (e, o, s, n, l) {
                a.MulTXX(s, l, this.m_xf), a.MulXV(this.m_xf, n.m_centroid, this.m_centroidB), this.m_v0.Copy(o.m_vertex0), this.m_v1.Copy(o.m_vertex1), this.m_v2.Copy(o.m_vertex2), this.m_v3.Copy(o.m_vertex3);
                var m = o.m_hasVertex0,
                    _ = o.m_hasVertex3,
                    h = i.SubVV(this.m_v2, this.m_v1, b2EPCollider.s_edge1);
                h.Normalize(), this.m_normal1.Set(h.y, -h.x);
                var u = i.DotVV(this.m_normal1, i.SubVV(this.m_centroidB, this.m_v1, i.s_t0)),
                    c = 0,
                    p = 0,
                    f = !1,
                    d = !1;
                if (m) {
                    var y = i.SubVV(this.m_v1, this.m_v0, b2EPCollider.s_edge0);
                    y.Normalize(), this.m_normal0.Set(y.y, -y.x), f = i.CrossVV(y, h) >= 0, c = i.DotVV(this.m_normal0, i.SubVV(this.m_centroidB, this.m_v0, i.s_t0))
                }
                if (_) {
                    var b = i.SubVV(this.m_v3, this.m_v2, b2EPCollider.s_edge2);
                    b.Normalize(), this.m_normal2.Set(b.y, -b.x), d = i.CrossVV(h, b) > 0, p = i.DotVV(this.m_normal2, i.SubVV(this.m_centroidB, this.m_v2, i.s_t0))
                }
                m && _ ? f && d ? (this.m_front = c >= 0 || u >= 0 || p >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal0), this.m_upperLimit.Copy(this.m_normal2)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1).SelfNeg())) : f ? (this.m_front = c >= 0 || u >= 0 && p >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal0), this.m_upperLimit.Copy(this.m_normal1)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal2).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1).SelfNeg())) : d ? (this.m_front = p >= 0 || c >= 0 && u >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal2)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal0).SelfNeg())) : (this.m_front = c >= 0 && u >= 0 && p >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal1)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal2).SelfNeg(), this.m_upperLimit.Copy(this.m_normal0).SelfNeg())) : m ? f ? (this.m_front = c >= 0 || u >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal0), this.m_upperLimit.Copy(this.m_normal1).SelfNeg()) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal1).SelfNeg())) : (this.m_front = c >= 0 && u >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal1).SelfNeg()) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal0).SelfNeg())) : _ ? d ? (this.m_front = u >= 0 || p >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal2)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1))) : (this.m_front = u >= 0 && p >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1)) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal2).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1))) : (this.m_front = u >= 0, this.m_front ? (this.m_normal.Copy(this.m_normal1), this.m_lowerLimit.Copy(this.m_normal1).SelfNeg(), this.m_upperLimit.Copy(this.m_normal1).SelfNeg()) : (this.m_normal.Copy(this.m_normal1).SelfNeg(), this.m_lowerLimit.Copy(this.m_normal1), this.m_upperLimit.Copy(this.m_normal1))), this.m_polygonB.count = n.m_count;
                for (var v = 0; v < n.m_count; ++v) a.MulXV(this.m_xf, n.m_vertices[v], this.m_polygonB.vertices[v]), r.MulRV(this.m_xf.q, n.m_normals[v], this.m_polygonB.normals[v]);
                this.m_radius = 2 * t.b2_polygonRadius, e.pointCount = 0;
                var S = this.ComputeEdgeSeparation(b2EPCollider.s_edgeAxis);
                if (0 !== S.type && !(S.separation > this.m_radius)) {
                    var x = this.ComputePolygonSeparation(b2EPCollider.s_polygonAxis);
                    if (!(0 !== x.type && x.separation > this.m_radius)) {
                        var C;
                        C = 0 === x.type ? S : x.separation > .98 * S.separation + .001 ? x : S;
                        var A = b2EPCollider.s_ie,
                            B = b2EPCollider.s_rf;
                        if (1 === C.type) {
                            e.type = 1;
                            var V = 0,
                                g = i.DotVV(this.m_normal, this.m_polygonB.normals[0]);
                            for (v = 1; v < this.m_polygonB.count; ++v) {
                                var P = i.DotVV(this.m_normal, this.m_polygonB.normals[v]);
                                P < g && (g = P, V = v)
                            }
                            var w = V,
                                M = (w + 1) % this.m_polygonB.count;
                            (I = A[0]).v.Copy(this.m_polygonB.vertices[w]), I.id.cf.indexA = 0, I.id.cf.indexB = w, I.id.cf.typeA = 1, I.id.cf.typeB = 0, (D = A[1]).v.Copy(this.m_polygonB.vertices[M]), D.id.cf.indexA = 0, D.id.cf.indexB = M, D.id.cf.typeA = 1, D.id.cf.typeB = 0, this.m_front ? (B.i1 = 0, B.i2 = 1, B.v1.Copy(this.m_v1), B.v2.Copy(this.m_v2), B.normal.Copy(this.m_normal1)) : (B.i1 = 1, B.i2 = 0, B.v1.Copy(this.m_v2), B.v2.Copy(this.m_v1), B.normal.Copy(this.m_normal1).SelfNeg())
                        } else {
                            var I, D;
                            e.type = 2, (I = A[0]).v.Copy(this.m_v1), I.id.cf.indexA = 0, I.id.cf.indexB = C.index, I.id.cf.typeA = 0, I.id.cf.typeB = 1, (D = A[1]).v.Copy(this.m_v2), D.id.cf.indexA = 0, D.id.cf.indexB = C.index, D.id.cf.typeA = 0, D.id.cf.typeB = 1, B.i1 = C.index, B.i2 = (B.i1 + 1) % this.m_polygonB.count, B.v1.Copy(this.m_polygonB.vertices[B.i1]), B.v2.Copy(this.m_polygonB.vertices[B.i2]), B.normal.Copy(this.m_polygonB.normals[B.i1])
                        }
                        B.sideNormal1.Set(B.normal.y, -B.normal.x), B.sideNormal2.Copy(B.sideNormal1).SelfNeg(), B.sideOffset1 = i.DotVV(B.sideNormal1, B.v1), B.sideOffset2 = i.DotVV(B.sideNormal2, B.v2);
                        var G = b2EPCollider.s_clipPoints1,
                            F = b2EPCollider.s_clipPoints2;
                        if (!(b2ClipSegmentToLine(G, A, B.sideNormal1, B.sideOffset1, B.i1) < t.b2_maxManifoldPoints || b2ClipSegmentToLine(F, G, B.sideNormal2, B.sideOffset2, B.i2) < t.b2_maxManifoldPoints)) {
                            1 === C.type ? (e.localNormal.Copy(B.normal), e.localPoint.Copy(B.v1)) : (e.localNormal.Copy(n.m_normals[B.i1]), e.localPoint.Copy(n.m_vertices[B.i1]));
                            var R = 0;
                            for (v = 0; v < t.b2_maxManifoldPoints; ++v) {
                                if (i.DotVV(B.normal, i.SubVV(F[v].v, B.v1, i.s_t0)) <= this.m_radius) {
                                    var J = e.points[R];
                                    1 === C.type ? (a.MulTXV(this.m_xf, F[v].v, J.localPoint), J.id = F[v].id) : (J.localPoint.Copy(F[v].v), J.id.cf.typeA = F[v].id.cf.typeB, J.id.cf.typeB = F[v].id.cf.typeA, J.id.cf.indexA = F[v].id.cf.indexB, J.id.cf.indexB = F[v].id.cf.indexA), ++R
                                }
                            }
                            e.pointCount = R
                        }
                    }
                }
            }, b2EPCollider.prototype.ComputeEdgeSeparation = function (e) {
                var o = e;
                o.type = 1, o.index = this.m_front ? 0 : 1, o.separation = t.b2_maxFloat;
                for (var s = 0; s < this.m_polygonB.count; ++s) {
                    var n = i.DotVV(this.m_normal, i.SubVV(this.m_polygonB.vertices[s], this.m_v1, i.s_t0));
                    n < o.separation && (o.separation = n)
                }
                return o
            }, b2EPCollider.prototype.ComputePolygonSeparation = function (e) {
                var o = e;
                o.type = 0, o.index = -1, o.separation = -t.b2_maxFloat;
                for (var s = b2EPCollider.s_perp.Set(-this.m_normal.y, this.m_normal.x), n = 0; n < this.m_polygonB.count; ++n) {
                    var r = i.NegV(this.m_polygonB.normals[n], b2EPCollider.s_n),
                        a = b2Min(i.DotVV(r, i.SubVV(this.m_polygonB.vertices[n], this.m_v1, i.s_t0)), i.DotVV(r, i.SubVV(this.m_polygonB.vertices[n], this.m_v2, i.s_t0)));
                    if (a > this.m_radius) return o.type = 2, o.index = n, o.separation = a, o;
                    if (i.DotVV(r, s) >= 0) {
                        if (i.DotVV(i.SubVV(r, this.m_upperLimit, i.s_t0), this.m_normal) < -t.b2_angularSlop) continue
                    } else if (i.DotVV(i.SubVV(r, this.m_lowerLimit, i.s_t0), this.m_normal) < -t.b2_angularSlop) continue;
                    a > o.separation && (o.type = 2, o.index = n, o.separation = a)
                }
                return o
            }, b2EPCollider.s_edge1 = new i, b2EPCollider.s_edge0 = new i, b2EPCollider.s_edge2 = new i, b2EPCollider.s_ie = L.MakeArray(2), b2EPCollider.s_rf = new fi, b2EPCollider.s_clipPoints1 = L.MakeArray(2), b2EPCollider.s_clipPoints2 = L.MakeArray(2), b2EPCollider.s_edgeAxis = new ci, b2EPCollider.s_polygonAxis = new ci, b2EPCollider.s_n = new i, b2EPCollider.s_perp = new i, b2EPCollider
        }());

    function b2CollideEdgeAndPolygon(t, e, i, o, s) {
        di.Collide(t, e, i, o, s)
    }
    t.b2CollideEdgeAndPolygon = b2CollideEdgeAndPolygon;
    var yi = function (t) {
        function b2EdgeAndCircleContact() {
            return t.call(this) || this
        }
        return __extends(b2EdgeAndCircleContact, t), b2EdgeAndCircleContact.Create = function (t) {
            return new b2EdgeAndCircleContact
        }, b2EdgeAndCircleContact.Destroy = function (t, e) {}, b2EdgeAndCircleContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2EdgeAndCircleContact.prototype.Evaluate = function (t, e, i) {
            b2CollideEdgeAndCircle(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i)
        }, b2EdgeAndCircleContact
    }(Ie);
    t.b2EdgeAndCircleContact = yi;
    var bi = function (t) {
        function b2EdgeAndPolygonContact() {
            return t.call(this) || this
        }
        return __extends(b2EdgeAndPolygonContact, t), b2EdgeAndPolygonContact.Create = function (t) {
            return new b2EdgeAndPolygonContact
        }, b2EdgeAndPolygonContact.Destroy = function (t, e) {}, b2EdgeAndPolygonContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2EdgeAndPolygonContact.prototype.Evaluate = function (t, e, i) {
            b2CollideEdgeAndPolygon(t, this.m_fixtureA.GetShape(), e, this.m_fixtureB.GetShape(), i)
        }, b2EdgeAndPolygonContact
    }(Ie);
    t.b2EdgeAndPolygonContact = bi;
    var vi = function (t) {
        function b2ChainAndCircleContact() {
            return t.call(this) || this
        }
        return __extends(b2ChainAndCircleContact, t), b2ChainAndCircleContact.Create = function (t) {
            return new b2ChainAndCircleContact
        }, b2ChainAndCircleContact.Destroy = function (t, e) {}, b2ChainAndCircleContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2ChainAndCircleContact.prototype.Evaluate = function (t, e, i) {
            var o = this.m_fixtureA.GetShape(),
                s = this.m_fixtureB.GetShape(),
                n = o,
                r = b2ChainAndCircleContact.Evaluate_s_edge;
            n.GetChildEdge(r, this.m_indexA), b2CollideEdgeAndCircle(t, r, e, s, i)
        }, b2ChainAndCircleContact.Evaluate_s_edge = new Bt, b2ChainAndCircleContact
    }(Ie);
    t.b2ChainAndCircleContact = vi;
    var Si = function (t) {
        function b2ChainAndPolygonContact() {
            return t.call(this) || this
        }
        return __extends(b2ChainAndPolygonContact, t), b2ChainAndPolygonContact.Create = function (t) {
            return new b2ChainAndPolygonContact
        }, b2ChainAndPolygonContact.Destroy = function (t, e) {}, b2ChainAndPolygonContact.prototype.Reset = function (e, i, o, s) {
            t.prototype.Reset.call(this, e, i, o, s)
        }, b2ChainAndPolygonContact.prototype.Evaluate = function (t, e, i) {
            var o = this.m_fixtureA.GetShape(),
                s = this.m_fixtureB.GetShape(),
                n = o,
                r = b2ChainAndPolygonContact.Evaluate_s_edge;
            n.GetChildEdge(r, this.m_indexA), b2CollideEdgeAndPolygon(t, r, e, s, i)
        }, b2ChainAndPolygonContact.Evaluate_s_edge = new Bt, b2ChainAndPolygonContact
    }(Ie);
    t.b2ChainAndPolygonContact = Si;
    var xi = function () {
        return function () {
            this.pool = null, this.createFcn = null, this.destroyFcn = null, this.primary = !1
        }
    }();
    t.b2ContactRegister = xi;
    var Ci = function () {
        function b2ContactFactory(t) {
            this.m_allocator = null, this.m_allocator = t, this.InitializeRegisters()
        }
        return b2ContactFactory.prototype.AddType = function (t, e, i, o) {
            var s = this,
                n = b2MakeArray(256, function (e) {
                    return t(s.m_allocator)
                });

            function poolCreateFcn(e) {
                return n.length > 0 ? n.pop() : t(e)
            }

            function poolDestroyFcn(t, e) {
                n.push(t)
            }
            this.m_registers[i][o].pool = n, this.m_registers[i][o].createFcn = poolCreateFcn, this.m_registers[i][o].destroyFcn = poolDestroyFcn, this.m_registers[i][o].primary = !0, i !== o && (this.m_registers[o][i].pool = n, this.m_registers[o][i].createFcn = poolCreateFcn, this.m_registers[o][i].destroyFcn = poolDestroyFcn, this.m_registers[o][i].primary = !1)
        }, b2ContactFactory.prototype.InitializeRegisters = function () {
            this.m_registers = [];
            for (var t = 0; t < 4; t++) {
                this.m_registers[t] = [];
                for (var e = 0; e < 4; e++) this.m_registers[t][e] = new xi
            }
            this.AddType(Te.Create, Te.Destroy, 0, 0), this.AddType(si.Create, si.Destroy, 2, 0), this.AddType(oi.Create, oi.Destroy, 2, 2), this.AddType(yi.Create, yi.Destroy, 1, 0), this.AddType(bi.Create, bi.Destroy, 1, 2), this.AddType(vi.Create, vi.Destroy, 3, 0), this.AddType(Si.Create, Si.Destroy, 3, 2)
        }, b2ContactFactory.prototype.Create = function (t, e, i, o) {
            var s = t.GetType(),
                n = i.GetType(),
                r = this.m_registers[s][n];
            if (!r.createFcn) return null;
            var a = r.createFcn(this.m_allocator);
            return r.primary ? a.Reset(t, e, i, o) : a.Reset(i, o, t, e), a
        }, b2ContactFactory.prototype.Destroy = function (t) {
            var e = t.m_fixtureA,
                i = t.m_fixtureB;
            t.m_manifold.pointCount > 0 && !e.IsSensor() && !i.IsSensor() && (e.GetBody().SetAwake(!0), i.GetBody().SetAwake(!0));
            var o = e.GetType(),
                s = i.GetType();
            this.m_registers[o][s].destroyFcn(t, this.m_allocator)
        }, b2ContactFactory
    }();
    t.b2ContactFactory = Ci;
    var Ai = function () {
        function b2ContactManager() {
            this.m_broadPhase = new Vi, this.m_contactList = null, this.m_contactCount = 0, this.m_contactFilter = xe.b2_defaultFilter, this.m_contactListener = Ae.b2_defaultListener, this.m_allocator = null, this.m_contactFactory = null, this.m_contactFactory = new Ci(this.m_allocator)
        }
        return b2ContactManager.prototype.AddPair = function (t, e) {
            var i = t,
                o = e,
                s = i.fixture,
                n = o.fixture,
                r = i.childIndex,
                a = o.childIndex,
                l = s.GetBody(),
                m = n.GetBody();
            if (l !== m) {
                for (var _ = m.GetContactList(); _;) {
                    if (_.other === l) {
                        var h = _.contact.GetFixtureA(),
                            u = _.contact.GetFixtureB(),
                            c = _.contact.GetChildIndexA(),
                            p = _.contact.GetChildIndexB();
                        if (h === s && u === n && c === r && p === a) return;
                        if (h === n && u === s && c === a && p === r) return
                    }
                    _ = _.next
                }
                if (!this.m_contactFilter || this.m_contactFilter.ShouldCollide(s, n)) {
                    var f = this.m_contactFactory.Create(s, r, n, a);
                    null !== f && (s = f.GetFixtureA(), n = f.GetFixtureB(), r = f.GetChildIndexA(), a = f.GetChildIndexB(), l = s.m_body, m = n.m_body, f.m_prev = null, f.m_next = this.m_contactList, null !== this.m_contactList && (this.m_contactList.m_prev = f), this.m_contactList = f, f.m_nodeA.contact = f, f.m_nodeA.other = m, f.m_nodeA.prev = null, f.m_nodeA.next = l.m_contactList, null !== l.m_contactList && (l.m_contactList.prev = f.m_nodeA), l.m_contactList = f.m_nodeA, f.m_nodeB.contact = f, f.m_nodeB.other = l, f.m_nodeB.prev = null, f.m_nodeB.next = m.m_contactList, null !== m.m_contactList && (m.m_contactList.prev = f.m_nodeB), m.m_contactList = f.m_nodeB, s.IsSensor() || n.IsSensor() || (l.SetAwake(!0), m.SetAwake(!0)), ++this.m_contactCount)
                }
            }
        }, b2ContactManager.prototype.FindNewContacts = function () {
            this.m_broadPhase.UpdatePairs(this)
        }, b2ContactManager.prototype.Destroy = function (t) {
            var e = t.GetFixtureA(),
                i = t.GetFixtureB(),
                o = e.GetBody(),
                s = i.GetBody();
            this.m_contactListener && t.IsTouching() && this.m_contactListener.EndContact(t), t.m_prev && (t.m_prev.m_next = t.m_next), t.m_next && (t.m_next.m_prev = t.m_prev), t === this.m_contactList && (this.m_contactList = t.m_next), t.m_nodeA.prev && (t.m_nodeA.prev.next = t.m_nodeA.next), t.m_nodeA.next && (t.m_nodeA.next.prev = t.m_nodeA.prev), t.m_nodeA === o.m_contactList && (o.m_contactList = t.m_nodeA.next), t.m_nodeB.prev && (t.m_nodeB.prev.next = t.m_nodeB.next), t.m_nodeB.next && (t.m_nodeB.next.prev = t.m_nodeB.prev), t.m_nodeB === s.m_contactList && (s.m_contactList = t.m_nodeB.next), this.m_contactFactory.Destroy(t), --this.m_contactCount
        }, b2ContactManager.prototype.Collide = function () {
            for (var t = this.m_contactList; t;) {
                var e = t.GetFixtureA(),
                    i = t.GetFixtureB(),
                    o = t.GetChildIndexA(),
                    s = t.GetChildIndexB(),
                    n = e.GetBody(),
                    r = i.GetBody();
                if (t.m_filterFlag) {
                    if (this.m_contactFilter && !this.m_contactFilter.ShouldCollide(e, i)) {
                        t = (m = t).m_next, this.Destroy(m);
                        continue
                    }
                    t.m_filterFlag = !1
                }
                var a = n.IsAwake() && 0 !== n.m_type,
                    l = r.IsAwake() && 0 !== r.m_type;
                if (a || l) {
                    var m, _ = e.m_proxies[o].proxy,
                        h = i.m_proxies[s].proxy;
                    if (this.m_broadPhase.TestOverlap(_, h)) t.Update(this.m_contactListener), t = t.m_next;
                    else t = (m = t).m_next, this.Destroy(m)
                } else t = t.m_next
            }
        }, b2ContactManager
    }();
    t.b2ContactManager = Ai;
    var Bi = function () {
        return function () {
            this.proxyA = null, this.proxyB = null
        }
    }();
    t.b2Pair = Bi;
    var Vi = function () {
        function b2BroadPhase() {
            this.m_tree = new O, this.m_proxyCount = 0, this.m_moveCount = 0, this.m_moveBuffer = [], this.m_pairCount = 0, this.m_pairBuffer = []
        }
        return b2BroadPhase.prototype.CreateProxy = function (t, e) {
            var i = this.m_tree.CreateProxy(t, e);
            return ++this.m_proxyCount, this.BufferMove(i), i
        }, b2BroadPhase.prototype.DestroyProxy = function (t) {
            this.UnBufferMove(t), --this.m_proxyCount, this.m_tree.DestroyProxy(t)
        }, b2BroadPhase.prototype.MoveProxy = function (t, e, i) {
            this.m_tree.MoveProxy(t, e, i) && this.BufferMove(t)
        }, b2BroadPhase.prototype.TouchProxy = function (t) {
            this.BufferMove(t)
        }, b2BroadPhase.prototype.GetFatAABB = function (t) {
            return this.m_tree.GetFatAABB(t)
        }, b2BroadPhase.prototype.GetUserData = function (t) {
            return this.m_tree.GetUserData(t)
        }, b2BroadPhase.prototype.TestOverlap = function (t, e) {
            return b2TestOverlapAABB(this.m_tree.GetFatAABB(t), this.m_tree.GetFatAABB(e))
        }, b2BroadPhase.prototype.GetProxyCount = function () {
            return this.m_proxyCount
        }, b2BroadPhase.prototype.UpdatePairs = function (t) {
            this.m_pairCount = 0;
            for (var e = function (t) {
                var e = i.m_moveBuffer[t];
                if (null === e) return "continue";
                var o = i,
                    s = i.m_tree.GetFatAABB(e);
                i.m_tree.Query(function (t) {
                    if (t.m_id === e.m_id) return !0;
                    o.m_pairCount === o.m_pairBuffer.length && (o.m_pairBuffer[o.m_pairCount] = new Bi);
                    var i = o.m_pairBuffer[o.m_pairCount];
                    return t.m_id < e.m_id ? (i.proxyA = t, i.proxyB = e) : (i.proxyA = e, i.proxyB = t), ++o.m_pairCount, !0
                }, s)
            }, i = this, o = 0; o < this.m_moveCount; ++o) e(o);
            this.m_moveCount = 0, this.m_pairBuffer.length = this.m_pairCount, this.m_pairBuffer.sort(b2PairLessThan);
            for (var s = 0; s < this.m_pairCount;) {
                var n = this.m_pairBuffer[s],
                    r = this.m_tree.GetUserData(n.proxyA),
                    a = this.m_tree.GetUserData(n.proxyB);
                for (t.AddPair(r, a), ++s; s < this.m_pairCount;) {
                    var l = this.m_pairBuffer[s];
                    if (l.proxyA.m_id !== n.proxyA.m_id || l.proxyB.m_id !== n.proxyB.m_id) break;
                    ++s
                }
            }
        }, b2BroadPhase.prototype.Query = function (t, e) {
            this.m_tree.Query(t, e)
        }, b2BroadPhase.prototype.RayCast = function (t, e) {
            this.m_tree.RayCast(t, e)
        }, b2BroadPhase.prototype.GetTreeHeight = function () {
            return this.m_tree.GetHeight()
        }, b2BroadPhase.prototype.GetTreeBalance = function () {
            return this.m_tree.GetMaxBalance()
        }, b2BroadPhase.prototype.GetTreeQuality = function () {
            return this.m_tree.GetAreaRatio()
        }, b2BroadPhase.prototype.ShiftOrigin = function (t) {
            this.m_tree.ShiftOrigin(t)
        }, b2BroadPhase.prototype.BufferMove = function (t) {
            this.m_moveBuffer[this.m_moveCount] = t, ++this.m_moveCount
        }, b2BroadPhase.prototype.UnBufferMove = function (t) {
            var e = this.m_moveBuffer.indexOf(t);
            this.m_moveBuffer[e] = null
        }, b2BroadPhase
    }();

    function b2PairLessThan(t, e) {
        return t.proxyA.m_id === e.proxyA.m_id ? t.proxyB.m_id - e.proxyB.m_id : t.proxyA.m_id - e.proxyA.m_id
    }
    t.b2BroadPhase = Vi, t.b2PairLessThan = b2PairLessThan;
    var gi = function () {
        return function () {
            this.vertices = [], this.count = 0, this.masses = [], this.gravity = new i(0, 0), this.damping = .1, this.k2 = .9, this.k3 = .1
        }
    }();
    t.b2RopeDef = gi;
    var Pi = function () {
        function b2Rope() {
            this.m_count = 0, this.m_ps = null, this.m_p0s = null, this.m_vs = null, this.m_ims = null, this.m_Ls = null, this.m_as = null, this.m_gravity = new i, this.m_damping = 0, this.m_k2 = 1, this.m_k3 = .1
        }
        return b2Rope.prototype.GetVertexCount = function () {
            return this.m_count
        }, b2Rope.prototype.GetVertices = function () {
            return this.m_ps
        }, b2Rope.prototype.Initialize = function (t) {
            this.m_count = t.count, this.m_ps = i.MakeArray(this.m_count), this.m_p0s = i.MakeArray(this.m_count), this.m_vs = i.MakeArray(this.m_count), this.m_ims = b2MakeNumberArray(this.m_count);
            for (var e = 0; e < this.m_count; ++e) {
                this.m_ps[e].Copy(t.vertices[e]), this.m_p0s[e].Copy(t.vertices[e]), this.m_vs[e].SetZero();
                var o = t.masses[e];
                this.m_ims[e] = o > 0 ? 1 / o : 0
            }
            var s = this.m_count - 1,
                n = this.m_count - 2;
            this.m_Ls = b2MakeNumberArray(s), this.m_as = b2MakeNumberArray(n);
            for (e = 0; e < s; ++e) {
                var r = this.m_ps[e],
                    a = this.m_ps[e + 1];
                this.m_Ls[e] = i.DistanceVV(r, a)
            }
            for (e = 0; e < n; ++e) {
                r = this.m_ps[e], a = this.m_ps[e + 1];
                var l = this.m_ps[e + 2],
                    m = i.SubVV(a, r, i.s_t0),
                    _ = i.SubVV(l, a, i.s_t1),
                    h = i.CrossVV(m, _),
                    u = i.DotVV(m, _);
                this.m_as[e] = b2Atan2(h, u)
            }
            this.m_gravity.Copy(t.gravity), this.m_damping = t.damping, this.m_k2 = t.k2, this.m_k3 = t.k3
        }, b2Rope.prototype.Step = function (t, e) {
            if (0 !== t) {
                for (var o = Math.exp(-t * this.m_damping), s = 0; s < this.m_count; ++s) this.m_p0s[s].Copy(this.m_ps[s]), this.m_ims[s] > 0 && this.m_vs[s].SelfMulAdd(t, this.m_gravity), this.m_vs[s].SelfMul(o), this.m_ps[s].SelfMulAdd(t, this.m_vs[s]);
                for (s = 0; s < e; ++s) this.SolveC2(), this.SolveC3(), this.SolveC2();
                var n = 1 / t;
                for (s = 0; s < this.m_count; ++s) i.MulSV(n, i.SubVV(this.m_ps[s], this.m_p0s[s], i.s_t0), this.m_vs[s])
            }
        }, b2Rope.prototype.SolveC2 = function () {
            for (var t = this.m_count - 1, e = 0; e < t; ++e) {
                var o = this.m_ps[e],
                    s = this.m_ps[e + 1],
                    n = i.SubVV(s, o, b2Rope.s_d),
                    r = n.Normalize(),
                    a = this.m_ims[e],
                    l = this.m_ims[e + 1];
                if (a + l !== 0) {
                    var m = a / (a + l),
                        _ = l / (a + l);
                    o.SelfMulSub(this.m_k2 * m * (this.m_Ls[e] - r), n), s.SelfMulAdd(this.m_k2 * _ * (this.m_Ls[e] - r), n)
                }
            }
        }, b2Rope.prototype.SetAngle = function (t) {
            for (var e = this.m_count - 2, i = 0; i < e; ++i) this.m_as[i] = t
        }, b2Rope.prototype.SolveC3 = function () {
            for (var e = this.m_count - 2, o = 0; o < e; ++o) {
                var s = this.m_ps[o],
                    n = this.m_ps[o + 1],
                    r = this.m_ps[o + 2],
                    a = this.m_ims[o],
                    l = this.m_ims[o + 1],
                    m = this.m_ims[o + 2],
                    _ = i.SubVV(n, s, b2Rope.s_d1),
                    h = i.SubVV(r, n, b2Rope.s_d2),
                    u = _.LengthSquared(),
                    c = h.LengthSquared();
                if (u * c != 0) {
                    var p = b2Atan2(i.CrossVV(_, h), i.DotVV(_, h)),
                        f = i.MulSV(-1 / u, _.SelfSkew(), b2Rope.s_Jd1),
                        d = i.MulSV(1 / c, h.SelfSkew(), b2Rope.s_Jd2),
                        y = i.NegV(f, b2Rope.s_J1),
                        b = i.SubVV(f, d, b2Rope.s_J2),
                        v = d,
                        S = a * i.DotVV(y, y) + l * i.DotVV(b, b) + m * i.DotVV(v, v);
                    if (0 !== S) {
                        S = 1 / S;
                        for (var x = p - this.m_as[o]; x > t.b2_pi;) x = (p -= 2 * t.b2_pi) - this.m_as[o];
                        for (; x < -t.b2_pi;) x = (p += 2 * t.b2_pi) - this.m_as[o];
                        var C = -this.m_k3 * S * x;
                        s.SelfMulAdd(a * C, y), n.SelfMulAdd(l * C, b), r.SelfMulAdd(m * C, v)
                    }
                }
            }
        }, b2Rope.prototype.Draw = function (t) {
            for (var e = new m(.4, .5, .7), i = 0; i < this.m_count - 1; ++i) t.DrawSegment(this.m_ps[i], this.m_ps[i + 1], e)
        }, b2Rope.s_d = new i, b2Rope.s_d1 = new i, b2Rope.s_d2 = new i, b2Rope.s_Jd1 = new i, b2Rope.s_Jd2 = new i, b2Rope.s_J1 = new i, b2Rope.s_J2 = new i, b2Rope
    }();
    t.b2Rope = Pi
}(B2D || (B2D = {}));

window.B2D = B2D;
// var userAgent = window.navigator.userAgent;
// userAgent && (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("VVGame") > -1 || userAgent.indexOf("OPPO") > -1) || (module.exports = B2D);