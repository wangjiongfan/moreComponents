Shadowbox.init();
			$(function() {
				$('#sb-player').live('mousemove', function(e) {
					var x = e.pageX - $(this).offset().left;
					var w = $(this).width();
					if (x < (w / 2)) {
						$(this).css('cursor', 'url(shadowbox/left.cur),auto');
					} else {
						$(this).css('cursor', 'url(shadowbox/right.cur),auto');
					}
				}).live('click', function(e) {
					var x = e.pageX - $(this).offset().left;
					var w = $(this).width();
					if (x < (w / 2)) {
						Shadowbox.previous();
					} else {
						Shadowbox.next();
					}
					return true;
				});
			});

			var DDSPEED = 10;
			var DDTIMER = 15;
			function ddMenu(id, d) {
				var h = document.getElementById(id + '-ddheader');
				var c = document.getElementById(id + '-ddcontent');
				clearInterval(c.timer);
				if (d == 1) {
					clearTimeout(h.timer);
					if (c.maxh && c.maxh <= c.offsetHeight) {
						return;
					} else if (!c.maxh) {
						c.style.top = '-' + c.offsetHeight + 'px';
						c.style.display = 'block';
						c.style.height = 'auto';
						c.maxh = c.offsetHeight;
						c.style.height = '0px';
					}
					c.timer = setInterval(function() {
						ddSlide(c, 1)
					}, DDTIMER);
				} else {
					h.timer = setTimeout(function() {
						ddCollapse(c)
					}, 50);
				}
			}
			function ddCollapse(c) {
				c.timer = setInterval(function() {
					ddSlide(c, -1)
				}, DDTIMER);
			}
			function cancelHide(id) {
				var h = document.getElementById(id + '-ddheader');
				var c = document.getElementById(id + '-ddcontent');
				clearTimeout(h.timer);
				clearInterval(c.timer);
				if (c.offsetHeight < c.maxh) {
					c.timer = setInterval(function() {
						ddSlide(c, 1)
					}, DDTIMER);
				}
			}
			function ddSlide(c, d) {
				var currh = c.offsetHeight;
				var dist;
				if (d == 1) {
					dist = (Math.round((c.maxh - currh) / DDSPEED));
				} else {
					dist = (Math.round(currh / DDSPEED));
				}
				if (dist <= 1 && d == 1) {
					dist = 1;
				}
				c.style.top = parseInt(c.style.top.replace('px', '')) - parseInt(dist * d) + 'px';
				c.style.height = currh + (dist * d) + 'px';
				if (getOs() == "Firefox") {
					c.style.opacity = currh / c.maxh;
					c.style.filter = 'alpha(opacity=' + (currh * 100 / c.maxh) + ')';
				}
				if ((currh < 2 && d != 1) || (currh > (c.maxh - 2) && d == 1)) {
					clearInterval(c.timer);
				}
			}

			function getOs() {
				var OsObject = "";
				if (navigator.userAgent.indexOf("MSIE") > 0) {
					return "MSIE";
				}
				if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
					return "Firefox";
				}
				if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
					return "Safari";
				}
				if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
					return "Camino";
				}
				if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
					return "Gecko";
				}
			}
			var cds = {
				O: [],
				ok: false,
				ym: 0,
				N: 0,
				fo: 0,
				sc: 0,
				sp: 0,
				to: 0,
				m_move: function(e) {
					if (!e) e = window.event;
					if (cds.fo.sg && !cds.w3c && !e.button) {
						cds.m_up();
						return;
					}
					cds.ym = e.screenY;
					if (cds.fo.sg) cds.fo.scrollTop = cds.fo.sZ + (cds.ym - cds.fo.yZ) / cds.fo.r;
				},
				m_up: function(e) {
					if (!e) e = window.event;
					var tg = (e.target) ? e.target : e.srcElement;
					if (cds.fo) cds.fo.sb.className = (tg.className.indexOf('scrollbar') > 0) ? 'cds_scrollbar cds_scrollbar_over' :
						'cds_scrollbar';
					document.onselectstart = '';
					cds.clr();
					cds.fo.sg = false;
				},
				clr: function() {
					clearTimeout(cds.to);
					cds.sc = 0;
					return false;
				},
				refresh: function() {
					for (var i = 0, N = cds.N; i < N; i++) {
						var o = cds.O[i];
						o.v_scroll();
						o.sb.style.width = o.st.style.width = o.su.style.width = o.su.style.height = o.sd.style.width = o.sd.style.height =
							o.w + 'px';
						o.sb.style.height = Math.ceil(Math.max(o.w * .5, o.r * o.offsetHeight) + 1) + 'px';
					}
				},
				a_scroll: function() {
					if (cds.sc != 0) {
						cds.fo.scrollTop += 6 * cds.sc / cds.fo.r;
						cds.to = setTimeout(cds.a_scroll, cds.sp);
						cds.sp = 32;
					}
				},
				m_down: function(o, s) {
					if (cds.sc == 0) {
						o.dv.sb.className = 'cds_scrollbar cds_scrollbar_pushed';
						cds.fo = o.dv;
						cds.sc = s;
						cds.sp = 400;
						cds.a_scroll();
					}
				},
				init: function() {
					if (window.oper || (!window.addEventListener && !window.attachEvent)) {
						this.ok = false;
						return;
					}
					function addEvent(o, e, f) {
						if (window.addEventListener) {
							o.addEventListener(e, f, false);
							cds.w3c = true;
							return true;
						}
						if (window.attachEvent) return o.attachEvent('on' + e, f);
						return false;
					}
					this.ok = addEvent(window.document, 'mousemove', cds.m_move);
					this.ok = addEvent(window.document, 'mouseup', cds.m_up);
					this.ok = addEvent(window, 'resize', cds.refresh);
					return this.ok;
				},
				add: function(id) {
					var dv = document.getElementById(id);
					if (!cds.ok) cds.init();
					if (!cds.ok || !dv) return false;
					function cDiv(c) {
						var o = document.createElement('div');
						o.dv = dv;
						o.className = c;
						dc.appendChild(o);
						return o;
					}
					var dc = dv.cloneNode(false);
					dc.style.overflow = "hidden";
					dv.parentNode.appendChild(dc);
					dc.appendChild(dv);
					dv.style.position = 'absolute';
					dv.style.left = dv.style.top = '0px';
					dv.style.width = dv.style.height = '100%';
					cds.O[cds.N++] = dv;
					dv.sg = false;
					dv.st = cDiv('cds_track');
					dv.sb = cDiv('cds_scrollbar');
					dv.su = cDiv('cds_up');
					dv.sd = cDiv('cds_down');
					dv.sb.onmousedown = function(e) {
						if (!this.dv.sg) {
							if (!e) e = window.event;
							cds.fo = this.dv;
							this.dv.yZ = e.screenY;
							this.dv.sZ = dv.scrollTop;
							this.dv.sg = true;
							this.className = 'cds_scrollbar cds_scrollbar_pushed';
							document.onselectstart = function() {
								return false;
							}
						}
						return false;
					}
					dv.st.onmousedown = function(e) {
						if (!e) e = window.event;
						cds.fo = this.dv;
						cds.ym = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
						for (var o = this.dv, y = 0; o != null; o = o.offsetParent) y += o.offsetTop;
						this.dv.scrollTop = (cds.ym - y - (this.dv.r * this.dv.offsetHeight / 2) - this.dv.w) / this.dv.r;
						this.dv.sb.onmousedown(e);
					}
					dv.su.onmousedown = dv.su.ondblclick = function(e) {
						cds.m_down(this, -1);
						return false;
					}
					dv.sd.onmousedown = dv.sd.ondblclick = function(e) {
						cds.m_down(this, 1);
						return false;
					}
					dv.su.onmouseout = dv.su.onmouseup = cds.clr;
					dv.sd.onmouseout = dv.sd.onmouseup = cds.clr;
					dv.sb.onmouseover = function(e) {
						if (!this.dv.sg) this.className = 'cds_scrollbar cds_scrollbar_over';
						return false;
					}
					dv.sb.onmouseout = function(e) {
						if (!this.dv.sg) this.className = 'cds_scrollbar';
						return false;
					}
					dv.v_scroll = function() {
						this.r = (this.offsetHeight - 2 * this.w) / this.scrollHeight;
						this.sb.style.top = Math.floor(this.w + this.scrollTop * this.r) + 'px';
					}
					dv.w = dv.offsetWidth - dv.clientWidth + 1;
					dv.v_scroll();
					cds.refresh();
					dv.onscroll = dv.v_scroll;
					return dv;
				}
			}

			onload = function() {
				cds.add('screen');
				cds.add('screen2');
			}